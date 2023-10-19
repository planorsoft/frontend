import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Control } from "react-hook-form";

interface InputNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
}

const InputNumber = ({ control, placeholder, fieldName }: InputNumberProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{placeholder}</FormLabel>
            <FormControl>
              <Input type="number" placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputNumber;
