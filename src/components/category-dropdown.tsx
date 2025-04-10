"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categoriesEnum } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CategoryDropdown({
  value,
  onChange,
}: {
  value: (typeof categoriesEnum.enumValues)[number];
  onChange: (value: (typeof categoriesEnum.enumValues)[number]) => void;
}) {
  const categories = categoriesEnum.enumValues;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="sm:w-[534px] md:w-[606px] justify-between"
        >
          {value
            ? categories.find((category) => category === value)
            : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[269px] sm:w-[534px] md:w-[606px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    onChange(currentValue as (typeof categories)[number]);
                    setOpen(false);
                  }}
                >
                  {category}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
