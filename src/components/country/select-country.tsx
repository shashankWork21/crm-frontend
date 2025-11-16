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
      country.name?.toLowerCase() === countrySearchTerm.trim().toLowerCase()
  );

  return (
    <Popover open={openCountry} onOpenChange={setOpenCountry}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCountry}
          className="w-full h-11 justify-between bg-white border-gray-200 hover:bg-gray-50"
        >
          {selectedCountry?.name || "Select country..."}
          <div className="w-fit gap-1 flex flex-row items-center">
            <Globe className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border-none"
        align="start"
      >
        <Command className="bg-white" shouldFilter={false}>
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
