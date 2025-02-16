import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { type ISelectOption } from "./types";
import { Label } from "@/components/ui/label";

export default function Combobox({
  label,
  placeholder = "Izaberi...",
  options,
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  options: ISelectOption[];
  value?: string;
  onChange: (value?: string) => void;
}) {
  const [open, setOpen] = useState(false)

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [value, options])

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <Popover
        open={open}
        onOpenChange={setOpen}

      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0"
          style={{
            width: "var(--radix-popover-trigger-width)",
          }}
        >
          <Command>
            <CommandInput placeholder="Traži..." />
            <CommandList>
              <CommandEmpty>Nema rezultata</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? undefined : option.value)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div >
  )
};
