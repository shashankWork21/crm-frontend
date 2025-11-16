"use client";

import ContactCreateForm from "@/components/contacts/contact-create-form";
import { useAuth } from "@/context/auth.context";

export default function CreateContactView() {
  const { user } = useAuth();
  const organisationId = user?.organisationId;

  return (
    <div className="p-12">
      <ContactCreateForm organisationId={organisationId as string} />
    </div>
  );
}
