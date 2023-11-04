import { useEffect } from "react";
import { login } from "@/containers/Identity/actions";
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
import { getTenant, setTenant } from "@/lib/tenant";

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
    message: "Lütfen parola giriniz",
  }),
  tenant: z.string(),
});

function Login() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      tenant: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(login(values));
  };

  useEffect(() => {
    const tenantFromUrl = getTenant();
    form.setValue("tenant", tenantFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.LOGIN_SUCCESS) {
      toast({
        title: "Hoşgeldin!",
      });
      setTenant(form.getValues().tenant, "/dashboard");
    } else if (identity.status === identityTypes.LOGIN_FAILURE) {
      toast({
        title: "Giriş yapılamadı",
        description: identity.error,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  return (
    <>
      <IdentityContainer type="login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
<<<<<<< Updated upstream
            {!getTenant() && (
              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alan adı</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-1 relative z-10">
                        <Input placeholder="sirket-ismi" {...field} />
                        <span className="absolute right-2">
                          .planorsoft.com
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
=======
            {!tenant ? (
              <>
                <FormField
                  control={form.control}
                  name="tenant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şirket İsmi</FormLabel>
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
                <Button
                  disabled={identity.loading}
                  type="button"
                  className="w-full"
                  onClick={setTenantHandler}
                >
                  {identity.loading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Devam et
                </Button>
              </>
            ) : (
              <>
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
                <Button
                  disabled={identity.loading}
                  type="submit"
                  className="w-full"
                >
                  {identity.loading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Giriş yap
                </Button>
              </>
>>>>>>> Stashed changes
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="planor@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={identity.loading}
              type="submit"
              className="w-full"
            >
              {identity.loading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Giriş yap
            </Button>
          </form>
        </Form>
      </IdentityContainer>
    </>
  );
}

export default Login;
