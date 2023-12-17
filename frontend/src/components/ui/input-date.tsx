import React, { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { CalendarIcon, Trash } from "lucide-react";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import { tr } from "date-fns/esm/locale";
import { cn } from "@/lib/utils";

interface InputDateProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  disabled?: boolean;
}

const InputDate = ({ control, placeholder, fieldName }: InputDateProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>{placeholder}</FormLabel>
          <Popover>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(null);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: tr })
                    ) : (
                      <span>Tarih seçiniz</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
            </div>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={tr}
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputDate;
