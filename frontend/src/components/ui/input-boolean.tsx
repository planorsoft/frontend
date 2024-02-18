import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Control } from "react-hook-form";
import { Switch } from "./switch";

interface InputBooleanProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  disabled?: boolean;
}

const InputBoolean = ({ control, placeholder, fieldName, disabled = false }: InputBooleanProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border px-2 py-1">
          <FormLabel>{ placeholder }</FormLabel>
          <FormControl>
            <Switch disabled={disabled} checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputBoolean;
