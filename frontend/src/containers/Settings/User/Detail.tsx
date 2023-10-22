import { useAppDispatch, useAppSelector } from "@/store";
import { UserState } from "./types";
import { useEffect, useState } from "react";
import { getMyUser, updateMyUser } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpsertImage from "./UpsertImage";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputString from "@/components/ui/input-string";
import InputPassword from "@/components/ui/input-password";
import { profileImageGenerator } from "@/lib/profile-image";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

const Detail = () => {
  const [openUpsertImage, setOpenUpsertImage] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector<UserState>((state) => state.userState);
  const loading = userState.loading;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (userState.user.email === "") {
      dispatch(getMyUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (userState.user.email !== "") {
        form.setValue("name", userState.user.name);
        form.setValue("email", userState.user.email);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userState.user]
  );

  useEffect(() => {
    if (userState.status == "UPDATE_MY_USER_SUCCESS") {
      toast({
        title: "Başarıyla güncellendi.",
      });
    } else if (userState.status == "UPDATE_AVATAR_SUCCESS") {
      toast({
        title: "Profil fotoğrafı başarıyla güncellendi.",
      });
    } else if (userState.status == "UPDATE_MY_USER_FAILURE") {
      toast({
        title: "Güncelleme başarısız.",
        description: userState.error,
        variant: "destructive"
      });
    }
  }, [userState.status]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (openUpsertImage) return;
    dispatch(updateMyUser(values));
  };

  return (
    <div className="container mx-auto px-0 md:px-12 lg:px-36">
      <div className="grid grid-cols-12 gap-1 mt-2">
        <div className="col-span-9 w-full md:w-1/2 md:mx-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputString
                control={form.control}
                placeholder="Email"
                fieldName="email"
                disabled={true}
              />
              <InputString
                control={form.control}
                placeholder="İsim"
                fieldName="name"
              />
              <InputPassword
                control={form.control}
                placeholder="Eski Parola"
                fieldName="oldPassword"
              />
              <InputPassword
                control={form.control}
                placeholder="Yeni Parola"
                fieldName="newPassword"
              />
              <Button disabled={loading} type="submit">
                {loading && (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Gönder
              </Button>
            </form>
          </Form>
        </div>
        <div className="col-span-3 text-center">
          <Avatar className="h-36 w-36 mx-auto mb-2">
            <AvatarImage src={userState.user.avatarUri} />
            <AvatarFallback>
              <img src={profileImageGenerator(userState.user.name)} alt="profile image" />
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            onClick={() => {
              setOpenUpsertImage(true);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Profil fotoğrafı
          </Button>
        </div>
      </div>
      <UpsertImage open={openUpsertImage} setOpen={setOpenUpsertImage} />
    </div>
  );
};

export default Detail;
