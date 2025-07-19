"use client";

import { CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ScheduleForm from "./schedule-form";
import { Schedule } from "@/lib/types";

interface ScheduleActionProps {
  edit: boolean;
  setEdit: (edit: boolean) => void;
  schedules?: Schedule[];
  regionId: string;
}

export default function ScheduleAction({
  edit,
  setEdit,
  schedules,
  regionId,
}: ScheduleActionProps) {
  return (
    <Dialog open={edit} onOpenChange={setEdit}>
      <DialogTrigger asChild>
        <button type="button" className="w-6 h-6 p-0 cursor-pointer">
          <CalendarClock className="text-slate-600 hover:text-slate-900" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {schedules?.length && schedules.length > 0
              ? "Edit Call Schedule"
              : "Create Call Schedule"}
          </DialogTitle>
          <DialogDescription>
            By setting the schedule for a region, you can ensure that calls are
            made on specific days of the month for contacts in this region.
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm
          regionId={regionId}
          defaultValues={
            schedules?.length && schedules.length > 0 ? schedules : null
          }
          setEdit={setEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
