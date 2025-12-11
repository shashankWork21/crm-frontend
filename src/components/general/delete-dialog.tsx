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
import { Trash2, AlertTriangle } from "lucide-react";
import { DeleteFormProps } from "@/lib/types";

export interface DeleteDialogProps {
  id: string;
  title: string;
  description: string;
  successCallback?: () => void;
  DeleteForm: React.ComponentType<DeleteFormProps>;
}

export default function DeleteDialog({
  id,
  title,
  description,
  DeleteForm,
  successCallback,
}: DeleteDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          onClick={() => setDialogOpen(true)}
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md">
        <DialogHeader className="text-center pb-2">
          {/* Warning Icon */}
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-slate-500 pb-4">
          {description}
        </DialogDescription>
        <div className="border-t border-slate-100 pt-4">
          <DeleteForm
            setOpen={setDialogOpen}
            id={id}
            successCallback={successCallback}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
