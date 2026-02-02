"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, Globe } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Country } from "@/lib/types";
import CreateCountry from "./create-country";

interface SelectCountryProps {
  openCountry: boolean;
  setOpenCountry: (open: boolean) => void;
  selectedCountry: Partial<Country> | null;
  setSelectedCountry: (country: Partial<Country>) => void;
  countrySearchTerm: string;
  setCountrySearchTerm: (term: string) => void;
  countryOptions: Partial<Country>[];
  isCreatingCountry: boolean;
  handleCreateCountry: (countryName: string) => Promise<void>;
}

export default function SelectCountry({
  openCountry,
  setOpenCountry,
  selectedCountry,
  setSelectedCountry,
  countrySearchTerm,
  setCountrySearchTerm,
  countryOptions,
  isCreatingCountry,
  handleCreateCountry,
}: SelectCountryProps) {
  const exactMatch = countryOptions.some(
    (country) =>
      country.name?.toLowerCase() === countrySearchTerm.trim().toLowerCase(),
  );

  return (
    <Popover open={openCountry} onOpenChange={setOpenCountry}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCountry}
          className="w-full h-12! border border-white/10 bg-white/5 text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70 [&>span[data-placeholder]]:text-white/30 text-"
        >
          <div className="gap-1 flex flex-row items-center justify-between w-full">
            {selectedCountry?.name || "Select country..."}
            <Globe className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0 bg-oxford-blue-200 text-white border-none"
        align="start"
      >
        <Command className="bg-oxford-blue-200 text-white" shouldFilter={false}>
          <CommandInput
            placeholder="Search country..."
            value={countrySearchTerm}
            onValueChange={setCountrySearchTerm}
          />
          <CommandList>
            {countrySearchTerm.trim() !== "" && countryOptions.length === 0 && (
              <CommandEmpty>
                <CreateCountry
                  handleCreate={handleCreateCountry}
                  isCreating={isCreatingCountry}
                  countrySearchTerm={countrySearchTerm}
                  buttonText="Yes"
                  optionsExist={false}
                />
              </CommandEmpty>
            )}
            {countryOptions.length > 0 && (
              <CommandGroup>
                {countryOptions.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      setSelectedCountry(country);
                      setOpenCountry(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedCountry?.id === country.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {country.name}
                  </CommandItem>
                ))}
                {!exactMatch && (
                  <CreateCountry
                    handleCreate={handleCreateCountry}
                    isCreating={isCreatingCountry}
                    countrySearchTerm={countrySearchTerm}
                    buttonText={`Add "${countrySearchTerm}" as a new country`}
                    optionsExist={true}
                  />
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
