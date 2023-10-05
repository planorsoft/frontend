import { useEffect, useState } from "react";
import { register } from "@/containers/Identity/actions";
import { getTenant } from "@/lib/tenant";
import { useNavigate } from "react-router-dom";
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
  role: z.string(),
  tenant: z.string(),
});

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      role: "Manager",
      tenant: "tenant",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.tenant = getTenant();
    values.username = values.email.split("@")[0];   
    setEmail(values.email); 
    dispatch(register(values));
  };

  useEffect(() => {
    const tenant = getTenant();
    if (!tenant) {
      navigate("/tenant?redirect=register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (identity.status === identityTypes.REGISTER_SUCCESS) {
      toast({
        title: "Hesabınız oluşturuldu, lütfen mail adresinizi kontrol edin.",
      });
      navigate(`/confirm-email?email=${email}`);
    } else if (identity.status === identityTypes.REGISTER_FAILURE) {
      toast({
        title: "Hesabınız oluşturulamadı",
        description: identity.error,
        variant: "destructive"
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
              Hesabını oluştur
            </Button>
          </form>
        </Form>
      </IdentityContainer>
    </>
  );
}

export default Register;
