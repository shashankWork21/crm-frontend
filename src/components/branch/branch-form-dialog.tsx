"use client";

import { BranchType } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import BranchForm from "./branch-form";

interface BranchFormDialogProps {
  id: string | null;
  branchEdit: boolean;
  setBranchEdit: (edit: boolean) => void;
  defaultValues: {
    organisationId: string;
    city: string;
    address: string;
    postalCode: string;
    regionId: string;
    type: BranchType;
    landlineNumber: string;
  };
  title: string;
  description: string;
  button: React.ReactNode;
  submitFormText: string;
}

export default function BranchFormDialog({
  button,
  id,
  branchEdit,
  setBranchEdit,
  defaultValues,
  title,
  description,
  submitFormText,
}: BranchFormDialogProps) {
  return (
    <Dialog open={branchEdit} onOpenChange={setBranchEdit}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <BranchForm
          id={id}
          setEdit={setBranchEdit}
          defaultValues={defaultValues}
          submitFormText={submitFormText}
        />
      </DialogContent>
    </Dialog>
  );
}
