import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Control } from "react-hook-form";
import { Button } from "./button";
import { Eye, EyeOffIcon } from "lucide-react";

interface InputPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  disabled?: boolean;
}

const InputPassword = ({
  control,
  placeholder,
  fieldName,
  disabled,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...field}
                disabled={disabled}
              />
              <Button
                className="absolute right-0 top-0"
                size="icon"
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOffIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputPassword;
