"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({
  label,
  date,
  setDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`justify-between font-normal bg-white`}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>{" "}
        <PopoverContent
          className={`w-auto overflow-hidden p-0 bg-white ${className}`}
          align="start"
        >
          <Calendar
            className="bg-white [&[data-slot=popover-content]]:bg-white"
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
