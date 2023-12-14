import { useEffect } from "react";
import { login, resetIdentityError } from "@/containers/Identity/actions";
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
import InputPassword from "@/components/ui/input-password";
import InputString from "@/components/ui/input-string";
import { useNavigate } from "react-router-dom";
import { getTenantByName } from "./service";
import jwtDecoder from "@/lib/jwtDecoder";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);
  const tenant = getTenant();

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
    dispatch(resetIdentityError());
    const tenantFromUrl = tenant;
    form.setValue("tenant", tenantFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.LOGIN_SUCCESS) {
      toast({
        title: "Hoşgeldin!",
      });
      const decodedToken = jwtDecoder();
      if (decodedToken.roles.includes("Manager")) {
        navigate("/dashboard");
      } else if (decodedToken.roles.includes("Employee")) {
        navigate("/dashboard");
      } else if (decodedToken.roles.includes("Customer")) {
        navigate("/customer-panel");
      }
    } else if (identity.status === identityTypes.LOGIN_FAILURE) {
      toast({
        title: "Giriş yapılamadı",
        description: identity.error,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  const setTenantHandler = () => {
    const tenant = form.getValues().tenant;
    getTenantByName(tenant).then((res) => {
      if (res) {
        setTenant(tenant.toLowerCase(), "/login");
      } else {
        toast({
          title: "Şirket bulunamadı",
          description: "Lütfen geçerli bir şirket adı giriniz.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <IdentityContainer type="login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!tenant ? (
            <>
              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alan adı</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-1 relative z-10">
                        <Input
                          placeholder="sirket-ismi"
                          {...field}
                          className="lowercase"
                        />
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
              <div className="flex flex-col space-y-1 text-center text-sm text-muted-foreground my-1">
                <Button
                  variant="ghost"
                  className="underline p-1 m-1"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Şifreni hatırlamıyor musun?
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </IdentityContainer>
  );
}

export default Login;
