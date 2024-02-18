import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: { value: string; label: string }[];
  selected: string[];
}

const MultiSelect = forwardRef<HTMLInputElement, InputProps>(
  (
    { options, selected, onChange, placeholder, className, ...props },
    forwardedRef
  ) => {
    if (onChange === undefined) throw new Error("onChange is required");

    const [open, setOpen] = useState(false);

    const handleUnselect = (item) => {
      onChange(selected.filter((i) => i !== item));
    };

    console.log({ options, selected });


    return (
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            ref={forwardedRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {selected.length > 0
                ? selected.map((item) => (
                    <Badge
                      variant="secondary"
                      key={item}
                      className="mr-1 mb-1"
                      onClick={() => handleUnselect(item)}
                    >
                      {console.log({options, item})}
                      {options.find((option) => item == option.value)?.label || 
                      "Bulunamadı"}
                      <a
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => handleUnselect(item)}
                      >
                        <Cross2Icon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </a>
                    </Badge>
                  ))
                : placeholder}
            </div>
            <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] max-h-[10rem] p-0">
          <Command className={className}>
            <CommandInput placeholder="Ara..." />
            <CommandList>
              <CommandEmpty>Bulunamadı.</CommandEmpty>
              <CommandGroup className="overflow-y-auto">
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    onSelect={(e) => {
                      onChange(
                        selected.includes(option.value)
                          ? selected.filter((item) => item !== option.value)
                          : [...selected, option.value]
                      );
                      setOpen(true);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
