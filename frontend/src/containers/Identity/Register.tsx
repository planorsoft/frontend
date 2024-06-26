import { useEffect, useState } from "react";
import { register, resetIdentityError } from "@/containers/Identity/actions";
import { getTenant, setTenant } from "@/lib/tenant";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState, identityTypes } from "./types";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import IdentityContainer from "./components/identity-container";
import InputString from "@/components/ui/input-string";
import InputPassword from "@/components/ui/input-password";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Lütfen geçerli bir isim giriniz.",
  }),
  username: z.string(),
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
  }),
  role: z.string(),
  tenant: z.string(),
});

function Register() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);
  const [email, setEmail] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      role: "Manager",
      tenant: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.username = values.email.split("@")[0];
    if (values.password !== values.rePassword) {
      form.setError("rePassword", {
        type: "manual",
        message: "Parolalar eşleşmiyor.",
      });
      return;
    }
    setEmail(values.email);
    values.tenant = values.tenant.toLowerCase();
    dispatch(register(values));
  };

  useEffect(() => {
    dispatch(resetIdentityError());
    const tenantFromUrl = getTenant();
    form.setValue("tenant", tenantFromUrl);
    if (tenantFromUrl) {
      form.setValue("role", "Customer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.REGISTER_SUCCESS) {
      setTenant(form.getValues().tenant, `/confirm-email?email=${email}`);
    } else if (identity.status === identityTypes.REGISTER_FAILURE) {
      toast({
        title: "Hesabınız oluşturulamadı",
        description: identity.error,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  return (
    <>
      <IdentityContainer type="register">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl>
                    <Input placeholder="Berk Selvi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!getTenant() && (
              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket Adı</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-1 relative z-10">
                        <Input placeholder="sirket-ismi" {...field} className="lowercase" />
                        <span className="absolute right-2">
                          .planorsoft.com
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <InputString
              control={form.control}
              placeholder="Email"
              fieldName="email"
            />
            <InputPassword
              control={form.control}
              placeholder="Parola"
              fieldName="password"
            />
            <InputPassword
              className="bg-red-500"
              control={form.control}
              placeholder="Parolayı yeniden giriniz"
              fieldName="rePassword"
            />
            <Button
              disabled={identity.loading}
              type="submit"
              className="w-full"
            >
              {identity.loading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Hesabını oluştur
            </Button>
          </form>
        </Form>
      </IdentityContainer>
    </>
  );
}

export default Register;
