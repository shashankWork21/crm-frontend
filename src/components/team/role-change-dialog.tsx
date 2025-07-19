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
          className="w-6 h-6 p-0 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <UserCog2 className="text-slate-600 hover:text-slate-900" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Change Role for {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          The user has different abilities based on the role
        </DialogDescription>
        <RoleChangeForm user={user} setEdit={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
