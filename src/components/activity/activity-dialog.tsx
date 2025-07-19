"use client";

import { Activity } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { ActivityIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import ActivityForm from "./activity-form";

interface ActivityDialogProps {
  activity?: Activity;
  contactId: string;
  followUpActivityId?: string;
}

export default function ActivityDialog({
  activity,
  contactId,
}: ActivityDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          activity ?
            <SquarePen className="w-6 h-6 text-yellow-700 hover:text-yellow-900 transition-colors duration-200 cursor-pointer" />
            :
            <ActivityIcon className="w-6 h-6 text-green-700 hover:text-green-900 transition-colors duration-200 cursor-pointer" />
        }
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activity ? "Edit Activity" : "Add New Activity"}
          </DialogTitle>
          <DialogDescription>
            Add an activity against this contact
          </DialogDescription>
        </DialogHeader>
        <ActivityForm
          setOpen={setOpen}
          activity={activity}
          contactId={contactId}
          submitFormText={activity ? "Update Activity" : "Create Activity"}
        />
      </DialogContent>
    </Dialog>
  );
}
