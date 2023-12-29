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
import { createUser, getUser, updateUser } from "./actions";
import InputPassword from "@/components/ui/input-password";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

interface UpsertProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail?: string;
}

const Upsert = ({ open, setOpen, userEmail }: UpsertProps) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector<UserState>((state) => state.userState);
  const user = userState.user;
  const loading = userState.loading;
  const [remove, setRemove] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userState.user.email === "" && userEmail) {
      dispatch(getUser(userEmail));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userEmail) {
      form.reset();
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
    if (userState.user.email !== "") {
      form.setValue("name", userState.user.name);
      form.setValue("email", userState.user.email);
      form.setValue("password", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user]);

  useEffect(() => {
    switch (userState.status) {
      case userTypes.UPDATE_USER_FAILURE || userTypes.CREATE_USER_FAILURE:
        toast({
          title: "Hata oluştu",
          description: userState.error,
          variant: "destructive",
        });
        break;
      case userTypes.UPDATE_USER_SUCCESS:
        toast({
          title: "Kullanıcı güncellendi",
        });
        setOpen(false);
        break;
      case userTypes.CREATE_USER_SUCCESS:
        toast({
          title: "Kullanıcı oluşturuldu",
        });
        setOpen(false);
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
              <p>Kullanıcı oluştur</p>
            ) : (
              <p>Kullanıcı düzenle</p>
            )}
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputString
                control={form.control}
                placeholder="Email"
                fieldName="email"
                disabled={!(!userEmail)}
              />
              <InputString
                control={form.control}
                placeholder="İsim"
                fieldName="name"
              />
              <InputPassword
                control={form.control}
                placeholder="Parola"
                fieldName="password"
              />
              {userEmail === "" ? (
                <Button disabled={loading} type="submit" className="w-full">
                  {loading && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Gönder
                </Button>
              ) : (
                <div className="grid grid-cols-12 gap-2">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="col-span-10"
                  >
                    {loading && (
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Gönder
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setRemove(true);
                    }}
                    variant="destructive"
                    className="col-span-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
      {remove && userEmail && (
        <Remove
          open={remove}
          setOpen={setRemove}
          entity="currency"
          entityIdString={userEmail}
          onDeleted={onDeleted}
        />
      )}
    </Dialog>
  );
};

export default Upsert;
