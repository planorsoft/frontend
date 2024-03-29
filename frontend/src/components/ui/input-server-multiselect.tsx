import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./form";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";
import Loader from "./loader";
import { MultiSelect } from "./mutliselect";
import jwtDecoder from "@/lib/jwtDecoder";
import { getTenant } from "@/lib/tenant";
import { User } from "@/containers/Settings/Team/types";

interface SelectList {
  value: string;
  label: string;
}

interface InputServerMultiSelectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  entity: "user";
}

export function InputServerMultiSelect({
  control,
  placeholder,
  fieldName,
  entity,
}: InputServerMultiSelectProps) {
  const [selectList, setSelectList] = useState<SelectList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const decodedToken = jwtDecoder();

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/odata/users?$select=Name,Email&$expand=Customer($select=Name)`,
        {
          headers: {
            "Planor-Tenant": getTenant(),
          },
        }
      );
      const orderByCustomerName = response.data.value.sort(
        (a: User, b: User) => {
          if (a.customer && b.customer) {
            return a.customer.name.localeCompare(b.customer.name);
          }
          return 0;
        }
      );
      let list = orderByCustomerName.map((item: User) => ({
        value: item.email,
        label: item.customer
          ? `(${item.customer.name}) ${item.name}`
          : item.name,
      }));
      // if list has same label, add 1 to the end of the label
      const sameValueList = list.filter(
        (item: SelectList) =>
          list.filter((i: SelectList) => i.label === item.label).length > 1
      );
      sameValueList.forEach((item: SelectList) => {
        const index = list.findIndex((i: SelectList) => i.value === item.value);
        list[index].label = `${list[index].label} ${index + 1}`;
      });
      if (decodedToken) {
        list = list.filter(
          (item: SelectList) => item.value !== decodedToken.email
        );
      }
      setSelectList(list);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      toast({
        title: "Hata oluştu",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (entity) {
      case "user":
        getUsers();
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
            return (
              <FormItem>
                <FormLabel>{placeholder}</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={selectList}
                  className=""
                  {...field}
                />
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    </>
  );
}
