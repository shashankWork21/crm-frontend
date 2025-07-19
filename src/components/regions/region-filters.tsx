"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

interface RegionFiltersProps {
  states: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
}

export default function RegionFilters({
  states,
  selectedStates,
  setSelectedStates,
}: RegionFiltersProps) {
  function handleStateChange(value: string) {
    if (!selectedStates.includes(value)) {
      {
        setSelectedStates([...selectedStates, value]);
      }
    }
  }
  return (
    <Select value="" onValueChange={handleStateChange}>
      <SelectTrigger className="w-1/8 cursor-pointer">
        <SelectValue placeholder="Filter by State" />
      </SelectTrigger>
      <SelectContent className="bg-white cursor-pointer">
        {states.map((state, index) => (
          <SelectItem
            className="cursor-pointer hover:bg-slate-100"
            key={index}
            value={state}
          >
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
