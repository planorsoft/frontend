import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { Control } from "react-hook-form";

interface InputStringProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
}

const InputString = ({ control, placeholder, fieldName } : InputStringProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputString;
