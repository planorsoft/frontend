import { useEffect } from "react";
import {
  forgotConfirmPassword,
  resetIdentityError,
} from "@/containers/Identity/actions";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState, identityTypes } from "./types";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import IdentityContainer from "./components/identity-container";
import { getTenant } from "@/lib/tenant";
import { useNavigate } from "react-router-dom";
import useQuery from "@/hooks/use-query";
import InputPassword from "@/components/ui/input-password";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Lütfen geçerli bir mail adresi giriniz.",
    })
    .min(2, {
      message: "Lütfen geçerli bir mail adresi giriniz.",
    }),
  password: z.string().min(6, {
    message: "Parola 6 haneden fazla karakter içermelidir.",
  }),
  rePassword: z.string().min(6, {
    message: "Parola 6 haneden fazla karakter içermelidir.",
  }).optional(),
  token: z.string(),
  tenant: z.string(),
});

function ForgotConfirmPassword() {
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);
  const tenant = getTenant();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
      token: "",
      tenant: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.rePassword) {
      form.setError("rePassword", {
        type: "manual",
        message: "Parolalar eşleşmiyor.",
      });
      return;
    }
    delete values.rePassword;
    dispatch(forgotConfirmPassword(values));
  };

  useEffect(() => {
    dispatch(resetIdentityError());
    const tenantFromUrl = tenant;
    form.setValue("tenant", tenantFromUrl);
    form.setValue("token", query.get("token")?.replaceAll(" ", "+") || "");
    form.setValue("email", query.get("email") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS) {
      toast({
        title: "Şifren başarıyla güncellendi, giriş yapabilirsin",
      });
      navigate("/login");
    } else if (
      identity.status === identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE
    ) {
      toast({
        title: "Bir hata oluştu",
        description: identity.error,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  return (
    <IdentityContainer type="forgot-confirm-password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputPassword
            control={form.control}
            placeholder="Parola"
            fieldName="password"
          />
          <InputPassword
            control={form.control}
            placeholder="Parolayı yeniden giriniz"
            fieldName="rePassword"
          />
          <Button disabled={identity.loading} type="submit" className="w-full">
            {identity.loading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Şifreni güncelle
          </Button>
        </form>
      </Form>
    </IdentityContainer>
  );
}

export default ForgotConfirmPassword;
