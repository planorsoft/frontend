import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Folder,
  KanbanSquare,
  Loader,
  Pencil,
  UserCog,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Customer } from "@/containers/Customer/types";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "./ui/use-toast";
import OData from "@/lib/odata";
import { Project } from "@/containers/Project/types";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";

interface ColumnDefs {
  customer: ColumnDef<Customer>[];
  project: ColumnDef<Project>[];
}

const columnDefs: ColumnDefs = {
  customer: [
    {
      accessorKey: "Id",
      header: "Id",
    },
    {
      accessorKey: "ImageUri",
      header: "Fotoğraf",
      cell: ({ row }) => {
        const image = row.getValue("ImageUri");

        return (
          <Avatar className="ml-2 h-7 w-7 max-[320px]:hidden">
            <AvatarImage
              src={image || profileImageGenerator(row.getValue("Name"))}
            />
            <AvatarFallback>
              <Loader className="w-8 h-8 animate-spin" />
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            İsim
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "IsCompany",
      header: "Şirket",
      cell: ({ row }) => {
        const isCompany = row.getValue("IsCompany");

        if (isCompany) {
          return (
            <div className="text-right font-medium">
              <Check />
            </div>
          );
        } else {
          return (
            <div className="text-right font-medium">
              <X />
            </div>
          );
        }
      },
    },
    {
      accessorKey: "City",
      header: "Şehir",
    },
  ],
  project: [
    {
      accessorKey: "Id",
      header: "Id",
    },
    {
      accessorKey: "Title",
      header: "Başlık",
    },
    {
      accessorKey: "Price",
      header: "Fiyat",
    },
    {
      accessorKey: "IsCompleted",
      header: "Tamamlandı",
      cell: ({ row }) => {
        const isCompleted = row.getValue("IsCompleted");

        if (isCompleted) {
          return (
            <div className="text-right font-medium">
              <Check />
            </div>
          );
        } else {
          return (
            <div className="text-right font-medium">
              <X />
            </div>
          );
        }
      },
    },
  ],
};

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  entity: "customer" | "project";
  select: (id: number, type?: string) => void;
  filter?: string;
}

function DataTable<T>({ url, entity, select, filter }: DataTableProps) {
  const navigate = useNavigate();
  const columns: ColumnDef<T>[] = columnDefs[
    entity as keyof ColumnDefs
  ] as ColumnDef<T>[];

  const odata = new OData<T>();
  const [data, setData] = useState<T[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [count, setCount] = useState<number>(0);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(count / pageSize),
    manualPagination: true,
    state: {
      pagination,
      sorting,
    },
  });

  async function fetchData({ sort, go }: { sort?: string; go: number }) {
    const select = odata.createSelectFromColumns(columns);
    url = `${url}?$count=true&$select=${select}&$top=${pageSize}`;

    if (filter) {
      url = `${url}&$filter=${filter}`;
    }

    if (sort) {
      url = `${url}&$orderby=${sort}`;
    }

    const skip = (pageIndex + go) * pageSize;
    url = `${url}&$skip=${skip}`;

    try {
      const response = await axios.get(url);
      setData(response.data.value);
      setCount(response.data["@odata.count"]);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const sort = odata.createSortFromSortingState(sorting);
    fetchData({ sort, go: 0 });
  }, [sorting, filter]);

  const goNextPage = () => {
    if (table.getCanNextPage()) {
      table.nextPage();
      setPagination({ pageIndex: pageIndex + 1, pageSize });
      const sort = odata.createSortFromSortingState(sorting);
      fetchData({ sort, go: 1 });
    }
  };

  const goPreviousPage = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
      setPagination({ pageIndex: pageIndex - 1, pageSize });
      const sort = odata.createSortFromSortingState(sorting);
      fetchData({ sort, go: -1 });
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.id === "Id") return null;
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead>Aksiyon</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id === "Id") return null;
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          select(row.getValue("Id"));
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {entity === "project" && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            navigate(`/duties/${row.getValue("Id")}`);
                          }}
                        >
                          <KanbanSquare className="w-4 h-4" />
                        </Button>
                      )}
                      {entity === "customer" && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              select(row.getValue("Id"), "contact");
                            }}
                          >
                            <UserCog className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              navigate(`/projects/${row.getValue("Id")}`);
                            }}
                          >
                            <Folder className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={goPreviousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Önceki
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goNextPage}
          disabled={!table.getCanNextPage()}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
