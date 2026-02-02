"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import TermsAndConditionsContent from "./terms-and-conditions";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface TncDialogProps {
  onAccept?: () => void;
}

export default function TncDialog({ onAccept }: TncDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-sunglow-500 hover:text-sunglow-400 underline underline-offset-2">
          terms and conditions
        </span>
      </DialogTrigger>
      <DialogContent className="md:min-w-225 max-h-[80vh] overflow-y-auto rounded-2xl border border-powder-blue-700/40 bg-oxford-blue-200 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Terms and Conditions</DialogTitle>
        </DialogHeader>
        <TermsAndConditionsContent />
        <DialogFooter>
          <Button
            className="bg-sunglow text-rich-black px-4 py-2 rounded-lg cursor-pointer hover:bg-oxford-blue-700 shadow-md"
            onClick={() => {
              onAccept?.();
              setDialogOpen(false);
            }}
          >
            Accept
          </Button>
          <Button
            className="bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-400 shadow-md"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
