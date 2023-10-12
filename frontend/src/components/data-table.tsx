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
import { ArrowUpDown, Check, X } from "lucide-react";
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
            return <div className="text-right font-medium"><Check /></div>
        } else {
            return <div className="text-right font-medium"><X /></div>
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
      header: "Başlık"
    },
    {
      accessorKey: "Price",
      header: "Fiyat",
    },
    {
      accessorKey: "IsOutsource",
      header: "Dış Müşteri",
      cell: ({ row }) => {
        const isOutsource = row.getValue("IsOutsource");
        
        if (isOutsource) {
            return <div className="text-right font-medium"><Check /></div>
        } else {
            return <div className="text-right font-medium"><X /></div>
        }
      },
    },
  ],
};

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  entity: "customer" | "project";
  filter: string | null;
}

function DataTable<T>({ url, entity, filter }: DataTableProps) {
  const columns: ColumnDef<T>[] = columnDefs[ entity as keyof ColumnDefs ] as ColumnDef<T>[];

  const odata = new OData<T>();
  const [data, setData] = useState<T[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [count, setCount] = useState<number>(0);
  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )


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
      sorting
    },
  });


  async function fetchData({ sort, go }: { sort?: string, go: number }) {
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
        title: "Giriş yapılamadı",
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
  }

  const goPreviousPage = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
      setPagination({ pageIndex: pageIndex - 1, pageSize });
      const sort = odata.createSortFromSortingState(sorting);
      fetchData({ sort, go: -1 });
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
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
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
