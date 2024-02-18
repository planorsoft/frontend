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

interface SelectList {
  value: string;
  label: string;
}

interface InputSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  selectList: SelectList[];
  disabled?: boolean;
}

export function InputSelect({
  control,
  placeholder,
  fieldName,
  selectList,
  disabled = false,
}: InputSelectProps) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        let value = field.value?.toString();
        if (value == 0) {
          value = "";
        }
        return (
          <FormItem>
            <FormLabel>{placeholder}</FormLabel>
            <Select onValueChange={field.onChange} value={value} disabled={disabled}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="overflow-y-auto max-h-[10rem]">
                {selectList.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
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
  );
}
