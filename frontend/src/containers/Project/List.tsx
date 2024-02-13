import { ProjectState } from "@/containers/Project/types";
import {
  Check,
  CircleSlash,
  KanbanSquare,
  Loader,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import Upsert from "./Upsert";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTitle from "@/hooks/use-title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProjects } from "./actions";
import { CustomerState } from "../Customer/types";
import { getCustomer } from "../Customer/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";

const List = () => {
  useTitle("Projects");
  const { t } = useTranslation();
  const customerId = Number(useParams().customerId) || undefined;
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectState = useAppSelector<ProjectState>(
    (state) => state.projectState
  );
  const customerState = useAppSelector<CustomerState>(
    (state) => state.customerState
  );
  const loading = projectState.loading;
  const customer = customerState.customer;

  useEffect(() => {
    if (projectState.projects) {
      dispatch(getProjects(1, customerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    if (!customerId) return;
    if (!customer) {
      dispatch(getCustomer(customerId));
    } else if (customer.id !== customerId) {
      dispatch(getCustomer(customerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const select = (id?: number) => {
    setId(id || 0);
    setOpen(true);
  };

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  };

  const fetchPage = (page: number) => {
    dispatch(getProjects(page, Number(customerId) || null));
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">{t("project.title")}</h2>
        <Button onClick={openUpsert}>
          <Plus size={16} /> {t("project.create")}
        </Button>
      </div>
      {loading ? (
        <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
      ) : projectState.projects.length > 0 ? (
        <>
          <Table>
            <TableCaption>{customerId && "Real Customers"}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("project.model2.id")}</TableHead>
                <TableHead>{t("project.model2.title")}</TableHead>
                <TableHead>{t("project.model2.price")}</TableHead>
                <TableHead>{t("project.model2.completed")}</TableHead>
                <TableHead>{t("project.model2.action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectState.projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    {project.price} {project.currencySymbol}
                  </TableCell>
                  <TableCell>
                    {project.isCompleted ? (
                      <div className="text-right font-medium">
                        <Check />
                      </div>
                    ) : (
                      <div className="text-right font-medium">
                        <X />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => select(project.id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          navigate(`/duties/${project.id}`);
                        }}
                      >
                        <KanbanSquare className="w-4 h-4" />
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
                fetchPage(projectState.pagination.pageNumber - 1);
              }}
              disabled={!projectState.pagination.hasPreviousPage}
            >
              {t("common.previous-page")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchPage(projectState.pagination.pageNumber + 1);
              }}
              disabled={!projectState.pagination.hasNextPage}
            >
              {t("common.next-page")}
            </Button>
          </div>
        </>
      ) : (
        <Alert>
          <CircleSlash className="h-4 w-4" />
          <AlertTitle>{t("project.cnot-found")}</AlertTitle>
          <AlertDescription>
          {t("project.not-found-description")}
          </AlertDescription>
        </Alert>
      )}
      {open && <Upsert open={open} setOpen={setOpen} projectId={id} />}
    </div>
  );
};

export default List;
