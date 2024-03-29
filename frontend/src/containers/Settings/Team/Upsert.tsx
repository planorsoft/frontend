import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { LoaderIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputString from "@/components/ui/input-string";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Remove from "@/components/remove";
import { UserState, userTypes } from "./types";
import { createUser, getUser, resetTeamStatus, updateUser } from "./actions";
import InputPassword from "@/components/ui/input-password";
import jwtDecoder from "@/lib/jwtDecoder";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  oldPassword: z.string(),
  newPassword: z.string(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail?: string;
}

const Upsert = ({ open, setOpen, userEmail }: UpsertProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const userState = useAppSelector<UserState>((state) => state.userState);
  const user = userState.user;
  const loading = userState.loading;
  const [remove, setRemove] = useState<boolean>();
  const decodedToken = jwtDecoder()
  const isManager = decodedToken?.roles.includes("Manager");
  const isHimself = decodedToken?.email == userEmail;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (userState.user.email === "" && userEmail) {
      dispatch(getUser(userEmail));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userEmail === "") {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    if (!user) {
      dispatch(getUser(userEmail));
    } else if (user.email !== userEmail) {
      dispatch(getUser(userEmail));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  useEffect(() => {
    if (userState.user.email !== "" && userEmail !== "") {
      form.setValue("name", userState.user.name);
      form.setValue("email", userState.user.email);
      form.setValue("password", "");
      form.setValue("oldPassword", "");
      form.setValue("newPassword", "");
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user, userEmail]);

  useEffect(() => {
    switch (userState.status) {
      case userTypes.UPDATE_USER_FAILURE || userTypes.CREATE_USER_FAILURE:
        toast({
          title: t("common.error-occured"),
          description: userState.error,
          variant: "destructive",
        });
        dispatch(resetTeamStatus());
        break;
      case userTypes.UPDATE_USER_SUCCESS:
        toast({
          title: t("common.update-succeeded"),
        });
        setOpen(false);
        dispatch(resetTeamStatus());
        break;
      case userTypes.CREATE_USER_SUCCESS:
        toast({
          title: t("common.create-succeeded"),
        });
        setOpen(false);
        dispatch(resetTeamStatus());
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.status]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (remove) return;
    if (userEmail) {
      dispatch(updateUser(values.email, values));
    } else {
      dispatch(createUser(values));
    }
  };

  const onDeleted = () => {
    setRemove(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12">
        <DialogHeader>
          <DialogTitle>
            {userEmail === "" ? (
              <p>{t("settings.team.create")}</p>
            ) : (
              <p>{t("settings.team.edit")}</p>
            )}
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
              <InputString
                control={form.control}
                placeholder={t("settings.team.model.mail")}
                fieldName="email"
                disabled={!!userEmail}
                disableAutoComplete
              />
              <InputString
                control={form.control}
                placeholder={t("settings.team.model.name")}
                fieldName="name"
                disableAutoComplete
              />
              {userEmail === "" ? (
                <InputPassword
                  control={form.control}
                  placeholder={t("settings.team.model.password")}
                  fieldName="password"
                  disableAutoComplete
                />
              ) : (
                <>
                  <InputPassword
                    control={form.control}
                    placeholder={t("settings.team.model.old-password")}
                    fieldName="oldPassword"
                    disableAutoComplete
                  />
                  <InputPassword
                    control={form.control}
                    placeholder={t("settings.team.model.new-password")}
                    fieldName="newPassword"
                    disableAutoComplete
                  />
                </>
              )}
              {userEmail === "" ? (
                <Button disabled={loading} type="submit" className="w-full">
                  {loading && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("common.save")}
                </Button>
              ) : (
                <div className="grid grid-cols-12 gap-2">
                  <Button
                    disabled={loading}
                    type="submit"
                    className={(isManager && !isHimself) ? "col-span-10" : "col-span-12"}
                  >
                    {loading && (
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("common.save")}
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setRemove(true);
                    }}
                    variant="destructive"
                    className={(isManager && !isHimself) ? "col-span-2" : "hidden"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
      {isManager && remove && userEmail && (
        <Remove
          open={remove}
          setOpen={setRemove}
          entity="user"
          entityIdString={userEmail}
          onDeleted={onDeleted}
        />
      )}
    </Dialog>
  );
};

export default Upsert;
