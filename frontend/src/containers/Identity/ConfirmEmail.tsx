import { useEffect, useState } from "react";
import { confirm } from "@/containers/Identity/actions";
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
import useQuery from "@/hooks/use-query";

const formSchema = z.object({
  token: z.string().min(6, {
    message: "Lütfen geçerli bir token giriniz.",
  }).max(6, {
    message: "Lütfen geçerli bir token giriniz.",
  }),
  email: z.string(),
  tenant: z.string(),
});

function Register() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);
  const [showEmail, setShowEmail] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      token: "",
      tenant: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.tenant = getTenant();
    const email = values.email || query.get("email");
    if (email == null) {
        setShowEmail(true);
        toast({
            title: "Lütfen email adresinizi giriniz.",
        });
        return;
    }
    values.email = email;
    dispatch(confirm(values));
  };

  useEffect(() => {
    if (identity.status === identityTypes.CONFIRM_SUCCESS) {
      toast({
        title: "Hesabınız doğrulandı, lütfen giriş yapınız.",
      });
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.status]);

  return (
    <>
      <IdentityContainer type="confirm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod</FormLabel>
                  <FormControl>
                    <Input placeholder="123123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem  hidden={!showEmail}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="planor@gmail.com" {...field} />
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
              Hesabını onayla
            </Button>
          </form>
        </Form>
      </IdentityContainer>
    </>
  );
}

export default Register;
