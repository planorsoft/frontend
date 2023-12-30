import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Control } from "react-hook-form";
import { useMaskito } from '@maskito/react';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
 



interface InputPhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  fieldName: string;
  disabled?: boolean;
}

const InputPhone = ({ control, placeholder, fieldName, disabled } : InputPhoneProps) => {
    const options = maskitoPhoneOptionsGenerator({countryIsoCode: 'TR', metadata});
    const maskedInputRef = useMaskito({options});

    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
            <FormItem>
                <FormLabel>{placeholder}</FormLabel>
                    <FormControl>
                        <Input 
                            {...field} 
                            ref={maskedInputRef} 
                            placeholder={placeholder} 
                            disabled={disabled}
                            onInput={(event) => {
                                field.onChange(event.currentTarget.value);
                            }} />
                    </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
    );
};

export default InputPhone;
