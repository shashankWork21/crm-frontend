"use client";

import { Contact, User } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useState } from "react";

import { ContactEditFormProps } from "./contact-edit-form";

interface ContactEditDialogProps {
  contact: Contact;
  EditForm: React.ComponentType<ContactEditFormProps>;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  title: string;
  description: string;
  team?: User[];
  successCallback?: () => void;
}

export default function ContactEditDialog({
  contact,
  EditForm,
  icon,
  iconClassName,
  title,
  description,
  team,
  successCallback,
}: ContactEditDialogProps) {
  const [edit, setEdit] = useState(false);
  const Icon = icon;
  const button = <Icon className={iconClassName} />;

  return (
    <Dialog open={edit} onOpenChange={setEdit}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {team ? (
          <EditForm
            contact={contact}
            setOpen={setEdit}
            team={team}
            successCallback={successCallback}
          />
        ) : (
          <EditForm
            contact={contact}
            setOpen={setEdit}
            successCallback={successCallback}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
