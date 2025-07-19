"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import RegionForm from "./region-form";

interface RegionFormDialogProps {
  id: string | null;
  regionEdit: boolean;
  setRegionEdit: (edit: boolean) => void;
  defaultValues: {
    name: string;
    state: string;
    country: string;
  };
  title: string;
  description: string;
  button: React.ReactNode;
  submitFormText: string;
}

export default function RegionFormDialog({
  button,
  id,
  regionEdit,
  setRegionEdit,
  defaultValues,
  title,
  description,
  submitFormText,
}: RegionFormDialogProps) {
  return (
    <Dialog open={regionEdit} onOpenChange={setRegionEdit}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <RegionForm
          id={id}
          setEdit={setRegionEdit}
          defaultValues={defaultValues}
          submitFormText={submitFormText}
        />
      </DialogContent>
    </Dialog>
  );
}
