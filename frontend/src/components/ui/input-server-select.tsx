import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";
import Loader from "./loader";
import { InputSelect } from "./input-select";
import { Control } from "react-hook-form";
import { getTenant } from "@/lib/tenant";

interface SelectList {
  value: string;
  label: string;
}

interface InputServerSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  entity: "project" | "customer" | "user";
  disabled?: boolean;
}

export function InputServerSelect({
  control,
  placeholder,
  fieldName,
  entity,
  disabled = false
}: InputServerSelectProps) {
  const [selectList, setSelectList] = useState<SelectList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/odata/projects?$select=Id,Title");
      const list = response.data.value.map((item) => ({
        value: item.id.toString(),
        label: item.title,
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
        value: item.id.toString(),
        label: item.name,
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

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/odata/users?$select=Id,Email,Name", {
        headers: {
          "Planor-Tenant": getTenant(),
        },
      });
      const list = response.data.value.map((item) => ({
        value: item.email,
        label: item.name,
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
        <InputSelect
          control={control}
          placeholder={placeholder}
          fieldName={fieldName}
          selectList={selectList}
          disabled={disabled}
        />
      )}
    </>
  );
}
