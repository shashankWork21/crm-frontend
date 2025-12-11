"use client";

import { User } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import ProfileEditForm from "./profile-edit-form";
import { SquarePen } from "lucide-react";

interface ProfileEditDialogProps {
  user: User;
  edit: boolean;
  setEdit: (edit: boolean) => void;
}

export default function ProfileEditDialog({
  user,
  edit,
  setEdit,
}: ProfileEditDialogProps) {
  return (
    <Dialog open={edit} onOpenChange={setEdit}>
      <DialogTrigger asChild>
        <button type="button" className="w-6 h-6 p-0 cursor-pointer">
          <SquarePen className="text-oxford-blue hover:text-oxford-blue-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border border-slate-200 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-slate-900">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500">
            Update your name and phone number.
          </DialogDescription>
        </DialogHeader>
        <ProfileEditForm user={user} setEdit={setEdit} />
      </DialogContent>
    </Dialog>
  );
}
