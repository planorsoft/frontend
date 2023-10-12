import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { createCustomer } from "./service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir isim giriniz.",
    }),
  isCompany: z.boolean(),
  address: z.string(),
  city: z.string(),
  district: z.string(),
  postCode: z.string(),
  country: z.string(),
  phoneNumber: z.string(),
  website: z.string(),
  governmentId: z.string(),
  isPotantial: z.boolean(),
  currencyCode: z.string(),
});

const Upsert = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      isCompany: false,
      address: "",
      city: "",
      district: "",
      postCode: "",
      country: "",
      phoneNumber: "",
      website: "",
      governmentId: "",
      isPotantial: false,
      currencyCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await createCustomer(values);
    setLoading(false);
  };


  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Müşteri oluştur</SheetTitle>
        <SheetDescription>
          
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
              name="isCompany"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-2 py-1">
                  <FormLabel>Şirket:</FormLabel>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Fatih mah. Uzunlar cad. Kısa sok. no 16/2 Fatih İstanbul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              type="submit"
              className="w-full"
            >
              {loading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Gönder
            </Button>
          </form>
        </Form>

        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default Upsert;
