"use client";

import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BulkContactForm from "./bulk-contact-form";
import { useState } from "react";

export default function ContactBulkUploadDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 pl-4 pr-2 rounded cursor-pointer transition-colors duration-200 shadow-md flex items-center">
          <Upload className="inline mr-2" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-200 to-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Import Contacts from Excel
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-2">
            Upload a CSV or Excel file to add multiple contacts at once.
          </DialogDescription>
        </DialogHeader>
        <BulkContactForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
