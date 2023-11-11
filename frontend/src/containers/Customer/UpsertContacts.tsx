import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  Dialog,
} from "@/components/ui/dialog";
import {
  createContact,
  getCustomer,
  inviteContact,
  removeContact,
} from "./service";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputString from "@/components/ui/input-string";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Loader from "@/components/ui/loader";
import { LoaderIcon, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Contact } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileImageGenerator } from "@/lib/profile-image";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir isim giriniz.",
    })
    .max(64, {
      message: "Lütfen geçerli bir isim giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir isim giriniz.",
    }),
  email: z
    .string()
    .email({
      message: "Lütfen geçerli bir email adresi giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir email adresi giriniz.",
    }),
});

interface UpsertContactsProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: number;
}

const UpsertContacts = ({ open, setOpen, customerId }: UpsertContactsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [create, setCreate] = useState(false);
  const [contacts, setContacts] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    getCustomerRequest();
  }, [customerId]);

  const getCustomerRequest = async () => {
    if (customerId != 0) {
      setLoading(true);
      try {
        const result = await getCustomer(customerId);
        setContacts(result?.contacts || []);
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          throw error;
        }
        toast({
          title: "Hata oluştu",
          description: error.response?.data.detail,
          variant: "destructive",
        });
      }
      setLoading(false);
    } else {
      form.reset();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const request = {
        ...values,
        username: values.email.split("@")[0],
      };
      const response = await createContact(customerId, request);
      if (response.status === 200) {
        setContacts([...contacts, request]);
        toast({
          title: "Başarıyla oluşturuldu",
        });
      }
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.response?.data.detail,
        variant: "destructive",
      });
    }
    setLoading(false);
    setCreate(false);
  };

  const removeContactToCustomer = async (email: string) => {
    try {
      await removeContact(customerId, email);
      setContacts(contacts.filter((contact) => contact.email !== email));
      toast({
        title: "Başarıyla silindi",
      });
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.response?.data.detail,
        variant: "destructive",
      });
    }
  };

  const inviteContactToCustomer = async (email: string) => {
    try {
      await inviteContact(customerId, email);
      toast({
        title: "Başarıyla davetiye gönderildi",
      });
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.response?.data.detail,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll h-full w-screen m-2 md:w-8/12">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between items-center mr-5">
                <h2>Müşteri iletişimleri</h2>
                <Button
                  variant={create ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={() => setCreate(!create)}
                >
                  <Plus className="h-4 w-4" />
                  Oluştur
                </Button>
              </div>
            </DialogTitle>
            {loading ? (
              <Loader />
            ) : (
              <>
                {create ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <InputString
                        control={form.control}
                        placeholder="İsim*"
                        fieldName="name"
                      />
                      <InputString
                        control={form.control}
                        placeholder="Email*"
                        fieldName="email"
                      />
                      {customerId === 0 ? (
                        <Button
                          disabled={loading}
                          type="submit"
                          className="w-full"
                        >
                          {loading && (
                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Gönder
                        </Button>
                      ) : (
                        <div className="grid grid-cols-12 gap-2">
                          <Button
                            disabled={loading}
                            type="submit"
                            className="col-span-12"
                          >
                            {loading && (
                              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Gönder
                          </Button>
                        </div>
                      )}
                    </form>
                  </Form>
                ) : (
                  <div className="grid grid-cols-12 mt-3 gap-2">
                    {contacts.map((contact: Contact) => (
                      <Card className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <CardContent className="flex flex-col justify-center items-center relative pt-6">
                          <Avatar className="h-7 w-7">
                            <AvatarImage
                              src={profileImageGenerator(contact.name)}
                            />
                            <AvatarFallback>
                              <LoaderIcon className="w-8 h-8 animate-spin" />
                            </AvatarFallback>
                          </Avatar>
                          <h4>{contact.name}</h4>
                          <p className="text-gray-500">{contact.email}</p>
                        </CardContent>
                        <CardFooter className="p-2 pt-0">
                          <div className="grid grid-cols-12 gap-1 w-full">
                            <Button
                              onClick={() => {
                                inviteContactToCustomer(contact.email);
                              }}
                              variant="outline"
                              className="col-span-10 truncate"
                            >
                              Davetiye gönder
                            </Button>
                            <Button
                              onClick={() => {
                                removeContactToCustomer(contact.email);
                              }}
                              variant="destructive"
                              className="col-span-2"
                            >
                              <p>
                                <Trash2 className="w-4 h-4" />
                              </p>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpsertContacts;
