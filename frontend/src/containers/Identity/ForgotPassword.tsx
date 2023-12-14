import { useEffect } from "react";
import {
  forgotPassword,
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
import InputString from "@/components/ui/input-string";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Lütfen geçerli bir mail adresi giriniz.",
    })
    .min(2, {
      message: "Lütfen geçerli bir mail adresi giriniz.",
    }),
  tenant: z.string(),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);
  const tenant = getTenant();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      tenant: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(forgotPassword(values));
  };

  useEffect(() => {
    dispatch(resetIdentityError());
    const tenantFromUrl = tenant;
    form.setValue("tenant", tenantFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.FORGOT_PASSWORD_SUCCESS) {
      toast({
        title: "Lütfen mail adresini kontrol et",
      });
    } else if (identity.status === identityTypes.FORGOT_PASSWORD_FAILURE) {
      toast({
        title: "Bir hata oluştu",
        description: identity.error,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  return (
    <IdentityContainer type="forgot-password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputString
            control={form.control}
            placeholder="Email"
            fieldName="email"
          />
          <Button disabled={identity.loading} type="submit" className="w-full">
            {identity.loading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Mail gönder
          </Button>
          <div className="flex flex-col space-y-1 text-center text-sm text-muted-foreground my-1">
            <Button
              variant="ghost"
              className="underline p-1 m-1"
              onClick={() => {
                navigate("/login");
              }}
            >
              Şifreni hatırladın mı?
            </Button>
          </div>
        </form>
      </Form>
    </IdentityContainer>
  );
}

export default ForgotPassword;
