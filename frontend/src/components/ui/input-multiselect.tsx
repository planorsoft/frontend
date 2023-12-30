import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { MultiSelect } from "./mutliselect";
import { SelectList } from "@/lib/types";

interface InputMultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  selectList: SelectList[];
}

export function InputMultiSelect({
  control,
  placeholder,
  fieldName,
  selectList,
}: InputMultiSelectProps) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{placeholder}</FormLabel>
            <MultiSelect
              options={selectList}
              selected={field.value}
              className="w-[560px]"
              {...field}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
