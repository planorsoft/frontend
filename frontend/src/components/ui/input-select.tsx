import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";

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
}

export function InputSelect({ control, placeholder, fieldName, selectList }: InputSelectProps) {

  return (
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
          <Select onValueChange={field.onChange} value={id}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
                {selectList.map((item, index) => (
                    <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}}
    />
  );
}
