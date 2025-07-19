"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";
import { DeleteFormProps } from "@/lib/types";

export interface DeleteDialogProps {
  id: string;
  title: string;
  description: string;
  DeleteForm: React.ComponentType<DeleteFormProps>;
}

export default function DeleteDialog({
  id,
  title,
  description,
  DeleteForm,
}: DeleteDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="w-6 h-6 p-0 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <Trash2 className="text-red-700 hover:text-red-800" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DeleteForm setOpen={setDialogOpen} id={id} />
      </DialogContent>
    </Dialog>
  );
}
