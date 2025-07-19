"use client";

import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ScheduleInputProps {
  daysOfMonth: number[];
  index: number;
  setDaysOfMonth: (days: number[]) => void;
}

export default function ScheduleInput({
  daysOfMonth,
  index,
  setDaysOfMonth,
}: ScheduleInputProps) {
  return (
    <div className="flex items-center justify-center w-full space-x-2">
      <Input
        type="number"
        name="dayOfMonth"
        value={daysOfMonth[index] || 0}
        onChange={(e) => {
          const newDays = [...daysOfMonth];
          newDays[index] = parseInt(e.target.value, 10);
          setDaysOfMonth(newDays);
        }}
        min={1}
        max={31}
        required
        className="bg-slate-50 border w-1/4"
        placeholder="Day of Month (1-31)"
      />
      <div className="flex items-center space-x-2">
        {index === daysOfMonth.length - 1 ? (
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setDaysOfMonth([...daysOfMonth, 1]);
            }}
            className="px-2 py-1 bg-transparent text-black rounded cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              const newDays = [...daysOfMonth];
              newDays.splice(index, 1);
              setDaysOfMonth(newDays);
            }}
            className="px-2 py-1 bg-transparent text-black rounded cursor-pointer"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
