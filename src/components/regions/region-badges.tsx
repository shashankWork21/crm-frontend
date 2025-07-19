"use client";

import { Badge } from "../ui/badge";

interface RegionBadgesProps {
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
}

export default function RegionBadges({
  selectedStates,
  setSelectedStates,
}: RegionBadgesProps) {
  function handleRemoveState(state: string) {
    setSelectedStates(selectedStates.filter((s) => s !== state));
  }

  return (
    <div className="flex flex-row space-x-2 text-md">
      {selectedStates.map((state, index) => (
        <Badge
          className="bg-slate-300 text-slate-800 flex flex-row space-x-1"
          key={index}
        >
          <span>{state}</span>
          <button
            type="button"
            className="cursor-pointer hover:text-lg"
            onClick={() => handleRemoveState(state)}
          >
            &times;
          </button>
        </Badge>
      ))}
    </div>
  );
}
