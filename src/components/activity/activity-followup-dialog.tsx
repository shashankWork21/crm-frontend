"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { UserCheck } from "lucide-react";
import { useState } from "react";
import ActivityForm from "./activity-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ActivityDialogProps {
  contactId: string;
  followUpActivityId: string;
}

export default function FollowUpActivityDialog({
  contactId,
  followUpActivityId,
}: ActivityDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <UserCheck className="w-6 h-6 text-green-700 hover:text-green-900 transition-colors duration-200 cursor-pointer" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-black px-2 py-1 rounded shadow-lg text-white">
            Add a Followup Activity
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Add a Followup Activity
          </DialogTitle>
          <DialogDescription>
            Add an activity against this contact
          </DialogDescription>
        </DialogHeader>
        <ActivityForm
          setOpen={setOpen}
          contactId={contactId}
          submitFormText="Create Followup Activity"
          followUpActivityId={followUpActivityId}
        />
      </DialogContent>
    </Dialog>
  );
}
