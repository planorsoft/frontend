import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Control } from "react-hook-form";
import { Textarea } from "./textarea";

interface InputTextareaProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
}

const InputTextarea = ({ control, placeholder, fieldName } : InputTextareaProps) => {

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTextarea;
