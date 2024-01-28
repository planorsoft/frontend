import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Contact, Pencil, Plus, Shield } from "lucide-react";
import UpsertUser from "./Upsert";
import { UserState } from "./types";
import { getTeam } from "./actions";
import jwtDecoder from "@/lib/jwtDecoder";
import { useTranslation } from "react-i18next";
import useTitle from "@/hooks/use-title";

const List = () => {
  const { t } = useTranslation();

  useTitle(t("settings.team.title"));
  const dispatch = useAppDispatch();
  const userState = useAppSelector<UserState>((state) => state.userState);
  const [upsert, showUpsert] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const decodedToken = jwtDecoder();

  useEffect(() => {
    if (userState.users.length === 0) {
      dispatch(getTeam());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userState.error) {
      toast({
        title: t("common.error-occured"),
        description: userState.error,
        variant: "destructive",
      });
    }
  }, [userState.error]);

  const handleUpsert = (id: string = "") => {
    setId(id);
    showUpsert(true);
  };

  const roleToIcon = (role?: string) => {
    switch (role) {
      case "Manager":
        return (
          <div className="flex flex-row items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>{t("settings.team.roles.manager")}</span>
          </div>
        );
      case "Employee":
        return (
          <div className="flex flex-row items-center gap-1">
            <Contact className="w-4 h-4" />
            <span>{t("settings.team.roles.employee")}</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-row items-center gap-1">
            <span>?</span>
            <span>{t("settings.team.roles.not-found")}</span>
          </div>
        );
    }
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      {userState.loading ? (
        <Loader />
      ) : userState.users.length == 0 ? (
        <Alert>
          <AlertTitle>{t("settings.team.roles.not-found")}</AlertTitle>
          <AlertDescription>
            {t("settings.team.description")}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="flex justify-between my-2">
            <h2 className="text-2xl font-semibold">{t("settings.team.title")}</h2>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  handleUpsert("");
                }}
              >
                <Plus className="w-4 h-4" /> {t("settings.team.create")}
              </Button>
            </div>
          </div>
          <Table>
            <TableCaption>{t("settings.team.footer")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("settings.team.model.mail")}</TableHead>
                <TableHead>{t("settings.team.model.name")}</TableHead>
                <TableHead>{t("settings.team.model.role")}</TableHead>
                <TableHead>{t("common.action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userState.users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{roleToIcon(user.roleName)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpsert(user.email)}
                      disabled={
                        decodedToken.roles.includes("Employee") &&
                        decodedToken.email !== user.email
                      }
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <UpsertUser open={upsert} setOpen={showUpsert} userEmail={id} />
    </div>
  );
};

export default List;
