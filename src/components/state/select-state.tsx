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

import { Country, State } from "@/lib/types";

interface SelectStateProps {
  selectedCountry: Partial<Country> | null;
  selectedState: Partial<State> | null;
  setSelectedState: (state: Partial<State> | null) => void;
  stateOptions: Partial<State>[];
  stateSearchTerm: string;
  setStateSearchTerm: (term: string) => void;
  handleCreateState: (stateName: string) => Promise<void>;
  openState: boolean;
  setOpenState: (open: boolean) => void;
  isCreatingState: boolean;
}

export default function SelectState({
  selectedCountry,
  selectedState,
  setSelectedState,
  stateOptions,
  stateSearchTerm,
  setStateSearchTerm,
  handleCreateState,
  openState,
  setOpenState,
  isCreatingState,
}: SelectStateProps) {
  const exactMatch = stateOptions.some(
    (state) =>
      state.name?.toLowerCase() === stateSearchTerm.trim().toLowerCase(),
  );
  console.log(stateOptions);
  return (
    <Popover open={openState} onOpenChange={setOpenState}>
      <PopoverTrigger
        asChild
        className="w-full h-12! border border-white/10 bg-white/5 text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70 [&>span[data-placeholder]]:text-white/30"
      >
        <Button variant="outline" role="combobox" aria-expanded={openState}>
          <div className="gap-1 flex flex-row items-center justify-between w-full">
            {selectedState?.name || "Select state..."}
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
            placeholder="Search state..."
            value={stateSearchTerm}
            onValueChange={setStateSearchTerm}
          />
          <CommandList>
            {stateSearchTerm.trim() !== "" && stateOptions.length === 0 && (
              <CommandEmpty>
                <div className="flex flex-col items-center gap-3 py-6 px-4">
                  <p className="text-sm text-powder-blue-900/40">
                    No state found with name &quot;
                    {stateSearchTerm}&quot; in the country &quot;
                    {selectedCountry?.name}&quot;. Want to add this state to our
                    list?
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleCreateState(stateSearchTerm)}
                    disabled={isCreatingState}
                    className="bg-sunglow hover:bg-sunglow-600 text-rich-black cursor-pointer"
                  >
                    {isCreatingState ? (
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
            {stateOptions.length > 0 && (
              <CommandGroup>
                {stateOptions.map((state) => (
                  <CommandItem
                    key={state.id}
                    value={state.name}
                    onSelect={() => {
                      setSelectedState(state);
                      setOpenState(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedState?.id === state.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {state.name}
                  </CommandItem>
                ))}
                {!exactMatch && (
                  <div className="flex flex-col items-center gap-3 py-6 px-4">
                    <p className="text-sm text-powder-blue-900/40">
                      These are the states that have the term &quot;
                      {stateSearchTerm}&quot; in them. In case you want to add a
                      new state, click the button below.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handleCreateState(stateSearchTerm)}
                      disabled={isCreatingState}
                      className="bg-sunglow hover:bg-sunglow-600 text-rich-black cursor-pointer"
                    >
                      {isCreatingState ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        `Add "${stateSearchTerm}" as a new state`
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
