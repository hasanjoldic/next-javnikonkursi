
import { CheckIcon } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ISelectOption } from "@/components/combobox/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  closePopover,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ComboboxMulti({
  label,
  placeholder = "Izaberite...",
  options,
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  options: ISelectOption[];
  value: Set<string>;
  onChange: (value: Set<string>) => void;
}) {
  const numSelected = value.size;

  const optionsByValue = useMemo(() => {
    return new Map(options.map((o) => [o.value, o]));
  }, [options]);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="font-medium">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-auto py-2">
            <div className="w-full flex flex-wrap items-center gap-1">
              {numSelected > 0 ? (
                Array.from(value.values()).map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {optionsByValue.get(value)?.label}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          style={{
            padding: 0,
            minWidth: 300,
            width: "var(--radix-popover-trigger-width)",
          }}
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options
                  .map((option) => {
                    const isSelected = value.has(option.value);

                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label ? `${option.value}-${option.label}` : option.value}
                        onSelect={() => {
                          if (isSelected) {
                            const next = new Set(value);
                            next.delete(option.value);
                            onChange(next);
                          } else {
                            const next = new Set(value);
                            next.add(option.value);
                            onChange(next);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <CheckIcon />
                          )}
                          <span>{option.label}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              {numSelected > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        onChange(new Set());
                        closePopover();
                      }}
                      className="justify-center text-center"
                    >
                      <span>Obriši sve</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}