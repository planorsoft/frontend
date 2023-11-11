import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";
import Loader from "./loader";

interface SelectList {
  value: string;
  label: string;
}

interface InputServerSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  entity: "project" | "customer";
}

export function InputServerSelect({
  control,
  placeholder,
  fieldName,
  entity,
}: InputServerSelectProps) {
  const [selectList, setSelectList] = useState<SelectList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/odata/projects?$select=Id,Title");
      const list = response.data.value.map((item) => ({
        value: item.Id.toString(),
        label: item.Title,
      }));
      setSelectList(list);
      setLoading(false);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/odata/customers?$select=Id,Name");
      const list = response.data.value.map((item) => ({
        value: item.Id.toString(),
        label: item.Name,
      }));
      setSelectList(list);
      setLoading(false);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    switch (entity) {
      case "project":
        getProjects();
        break;
      case "customer":
        getCustomers();
        break;
      default:
        break;
    }
  }, [entity]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormField
          control={control}
          name={fieldName}
          render={({ field }) => {
            let id = field.value?.toString();
            if (id == 0) {
              id = "";
            }
            return (
              <FormItem>
                <FormLabel>{placeholder}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={id}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectList.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    </>
  );
}
