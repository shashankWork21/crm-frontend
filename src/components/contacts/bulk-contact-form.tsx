"use client";

import { bulkCreateContacts } from "@/actions/contact";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { startTransition, useActionState, useEffect } from "react";

interface BulkContactFormProps {
  setOpen: (open: boolean) => void;
}

export default function BulkContactForm({ setOpen }: BulkContactFormProps) {
  const [formState, action] = useActionState(bulkCreateContacts, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="contactsFile"
        type="file"
        accept=".csv, .xlsx"
        className="mb-4 bg-white cursor-pointer"
      />
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
      >
        Import
      </Button>
      {formState.success && (
        <span className="text-green-600 mt-2">{formState.message}</span>
      )}
      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <span className="text-red-600 mt-2">
          {Object.values(formState.errors).join(", ")}
        </span>
      )}
    </form>
  );
}
