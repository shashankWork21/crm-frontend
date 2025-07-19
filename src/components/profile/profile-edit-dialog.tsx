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
          <SquarePen className="text-blue-700 hover:text-blue-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Update your name and Phone number.
          </DialogDescription>
        </DialogHeader>
        <ProfileEditForm user={user} setEdit={setEdit} />
      </DialogContent>
    </Dialog>
  );
}
