import { Button } from "@/components/ui/button";
import { CustomerState } from "@/containers/Customer/types";
import {
  Check,
  CircleSlash,
  Folder,
  Loader,
  Pencil,
  Plus,
  UserCog,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Upsert from "@/containers/Customer/Upsert";
import useTitle from "@/hooks/use-title";
import UpsertContacts from "./UpsertContacts";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCustomers } from "./actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "real" | "potential";
}

const List = ({ type }: ListProps) => {
  useTitle("Customers");
  const { t } = useTranslation();
  const isPotential = type !== "real";
  const [open, setOpen] = useState<boolean>(false);
  const [openContacts, setOpenContacts] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customerState = useAppSelector<CustomerState>(
    (state) => state.customerState
  );
  const loading = customerState.loading;

  useEffect(() => {
    if (customerState.customers) {
      dispatch(getCustomers(isPotential));
    }
  }, [type]);

  const select = (id: number, type?: string) => {
    setId(id);
    if (type === "contact") {
      setOpenContacts(true);
    } else {
      setOpen(true);
    }
  };

  const fetchPage = (page: number) => {
    dispatch(getCustomers(isPotential, page));
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          {type === "real" ? "Customers" : "Potential Customers"}
        </h2>
        <Button onClick={() => { select(0) }}>
          <Plus size={16} /> {t("customer.create")}
        </Button>
      </div>
      {loading ? (
        <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
      ) : customerState.customers.length > 0 ? (
        <>
          <Table>
            <TableCaption>
              {type == "real" && "Real Customers"}
              {type == "potential" && "Potential Customers"}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>{t("customer.photo")}</TableHead>
                <TableHead>{t("customer.name")}</TableHead>
                <TableHead>{t("customer.company")}</TableHead>
                <TableHead>{t("customer.city")}</TableHead>
                <TableHead>{t("customer.action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerState.customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <Avatar className="ml-2 h-7 w-7 max-[320px]:hidden">
                      <AvatarImage
                        src={
                          customer.imageUri ||
                          profileImageGenerator(customer.name)
                        }
                      />
                      <AvatarFallback>
                        <Loader className="w-8 h-8 animate-spin" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    {customer.isCompany ? (
                      <div className="text-right font-medium">
                        <Check />
                      </div>
                    ) : (
                      <div className="text-right font-medium">
                        <X />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell className="flex gap-1">
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => select(customer.id || 0)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          select(customer.id || 0, "contact");
                        }}
                      >
                        <UserCog className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          navigate(`/projects/${customer.id}`);
                        }}
                      >
                        <Folder className="w-4 h-4" />
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchPage(customerState.pagination.pageNumber - 1);
              }}
              disabled={!customerState.pagination.hasPreviousPage}
            >
              {t("customer.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchPage(customerState.pagination.pageNumber + 1);
              }}
              disabled={!customerState.pagination.hasNextPage}
            >
              {t("customer.next")}
            </Button>
          </div>
        </>
      ) : (
        <Alert>
          <CircleSlash className="h-4 w-4" />
          <AlertTitle>{t("customer.not-found")}</AlertTitle>
          <AlertDescription>
          {t("customer.not-found-description")}
          </AlertDescription>
        </Alert>
      )}
      {open && <Upsert open={open} setOpen={setOpen} customerId={id} isPotential={isPotential} />}
      {openContacts && (
        <UpsertContacts
          open={openContacts}
          setOpen={setOpenContacts}
          customerId={id}
        />
      )}
    </div>
  );
};

export default List;
