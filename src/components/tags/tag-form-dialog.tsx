"use client";

import { TagType } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import TagForm from "./tag-form";

interface TagFormDialogProps {
  id: string | null;
  tagEdit: boolean;
  setTagEdit: (edit: boolean) => void;
  defaultValues: {
    title: string;
    description: string;
    tagType: TagType;
  };
  title: string;
  description: string;
  button: React.ReactNode;
  submitFormText: string;
}

export default function TagFormDialog({
  button,
  id,
  tagEdit,
  setTagEdit,
  defaultValues,
  title,
  description,
  submitFormText,
}: TagFormDialogProps) {
  return (
    <Dialog open={tagEdit} onOpenChange={setTagEdit}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <TagForm
          id={id}
          setEdit={setTagEdit}
          defaultValues={defaultValues}
          submitFormText={submitFormText}
        />
      </DialogContent>
    </Dialog>
  );
}
