"use client";

import { updateContact } from "@/actions/contact";
import { Contact, User } from "@/lib/types";
import { startTransition, useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface ContactEditFormProps {
  contact: Contact;
  setOpen: (open: boolean) => void;
  team?: User[];
  successCallback?: () => void;
}

export default function ContactEditForm({
  contact,
  setOpen,
  successCallback,
}: ContactEditFormProps) {
  const [formState, action] = useActionState(
    updateContact.bind(null, contact.id),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      successCallback?.();
    }
  }, [formState.success, setOpen, successCallback]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
        <Input
          name="name"
          type="text"
          defaultValue={contact.name}
          placeholder="Name"
          className="bg-white w-full"
        />
        <Input
          name="email"
          type="email"
          defaultValue={contact.email || ""}
          placeholder="Email"
          className="bg-white w-full"
        />
        <Input
          name="phoneNumber"
          type="text"
          defaultValue={contact.phoneNumber}
          placeholder="Phone Number"
          className="bg-white w-full"
        />
        <Input
          name="alternateNumber"
          type="text"
          defaultValue={contact.alternateNumber || ""}
          placeholder="Alternate Number"
          className="bg-white w-full"
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Update
        </Button>
      </form>
      {formState.success && (
        <div className="text-green-600 text-center mt-4">
          {formState.message}
        </div>
      )}
    </>
  );
}
