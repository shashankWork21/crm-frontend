"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserCog2 } from "lucide-react";
import RoleChangeForm from "./role-change-form";
import { User } from "@/lib/types";

export interface RoleChangeDialogProps {
  user: User;
}

export default function RoleChangeDialog({ user }: RoleChangeDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-oxford-blue focus-visible:ring-offset-2"
          onClick={() => setOpen(true)}
          aria-label="Change role"
        >
          <UserCog2 className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition-colors" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border border-slate-200 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-slate-900">
            Change Role for {user?.firstName} {user?.lastName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-slate-500">
          The user has different abilities based on the role
        </DialogDescription>
        <RoleChangeForm user={user} setEdit={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
