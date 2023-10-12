import { IdentityState } from "./types";
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
import { useAppSelector } from "@/store";
import { setTenant } from "@/lib/tenant";
import useQuery from "@/hooks/use-query";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

const formSchema = z.object({
  tenant: z.string().min(2, {
    message: "Lütfen geçerli bir mail adresi giriniz.",
  }),
});

function Tenant() {
  const query = useQuery();
  const [redirect, setRedirect] = useState<string>("");
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenant: "",
    },
  });

  useEffect(() => {
    const redirectQuery = query.get("redirect");
    switch (redirectQuery) {
      case "login":
        setRedirect("login");
        break;
      case "register":
        setRedirect("register");
        break;
      default:
        setRedirect("login");
        break;
    }
  }, [])

  const checkTenant = async (tenant: string) => {
    try {
      await axios.get(`/tenants?name=${tenant}`);
      return true;
    } catch (error) {
      if(!(error instanceof AxiosError)) { throw error; }
      
      const status = error.response?.status;
      if(status === 404) {
        return false;
      } else {
        throw error;
      }
    }
  }
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isTenantExists = await checkTenant(values.tenant);
    if(!isTenantExists) {
      form.setError("tenant", {
        type: "manual",
        message: "Bu alan adı kullanılamaz.",
      });
      return;
    }
    
    setTenant(values.tenant);
    window.location.href = `http://${values.tenant}.localhost:3030/${redirect}`;
  };

  return (
    <>
      <IdentityContainer type="tenant">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tenant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alan adı</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <Input placeholder="sirket-ismi" {...field} />
                      <Input value=".planor.com" disabled />
                    </div>
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
              Devam et
            </Button>
          </form>
        </Form>
      </IdentityContainer>
    </>
  );
}

export default Tenant;
