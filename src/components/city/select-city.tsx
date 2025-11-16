"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, Globe, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { City, State } from "@/lib/types";

interface SelectCityProps {
  selectedState: Partial<State> | null;
  selectedCity: Partial<City> | null;
  setSelectedCity: (city: Partial<City> | null) => void;
  cityOptions: Partial<City>[];
  citySearchTerm: string;
  setCitySearchTerm: (term: string) => void;
  handleCreateCity: (cityName: string) => Promise<void>;
  openCity: boolean;
  setOpenCity: (open: boolean) => void;
  isCreatingCity: boolean;
}

export default function SelectCity({
  selectedState,
  selectedCity,
  setSelectedCity,
  cityOptions,
  citySearchTerm,
  setCitySearchTerm,
  handleCreateCity,
  openCity,
  setOpenCity,
  isCreatingCity,
}: SelectCityProps) {
  const exactMatch = cityOptions.some(
    (city) => city.name?.toLowerCase() === citySearchTerm.trim().toLowerCase()
  );
  return (
    <Popover open={openCity} onOpenChange={setOpenCity}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCity}
          className="w-full h-11 justify-between bg-white border-gray-200 hover:bg-gray-50"
        >
          {selectedCity?.name || "Select city..."}
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
            placeholder="Search city..."
            value={citySearchTerm}
            onValueChange={setCitySearchTerm}
          />
          <CommandList>
            {citySearchTerm.trim() !== "" && cityOptions.length === 0 && (
              <CommandEmpty>
                <div className="flex flex-col items-center gap-3 py-6">
                  <p className="text-sm text-gray-600">
                    No city found with name &quot;
                    {citySearchTerm}&quot; in the state &quot;
                    {selectedState?.name}&quot;. Want to add this city to our
                    list?
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleCreateCity(citySearchTerm)}
                    disabled={isCreatingCity}
                    className="bg-sunglow hover:bg-sunglow-600 text-rich-black cursor-pointer"
                  >
                    {isCreatingCity ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Yes"
                    )}
                  </Button>
                </div>
              </CommandEmpty>
            )}
            {cityOptions.length > 0 && (
              <CommandGroup>
                {cityOptions.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={city.name}
                    onSelect={() => {
                      setSelectedCity(city);
                      setOpenCity(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedCity?.id === city.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {city.name}
                  </CommandItem>
                ))}
                {!exactMatch && (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <p className="text-sm text-gray-600">
                      These are the cities that have the term &quot;
                      {citySearchTerm}&quot; in them. In case you want to add a
                      new city, click the button below.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handleCreateCity(citySearchTerm)}
                      disabled={isCreatingCity}
                      className="bg-sunglow hover:bg-sunglow-600 text-rich-black cursor-pointer"
                    >
                      {isCreatingCity ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        `Add "${citySearchTerm}" as a new city`
                      )}
                    </Button>
                  </div>
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
