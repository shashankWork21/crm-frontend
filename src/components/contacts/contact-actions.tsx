"use client";
import { Contact, User } from "@/lib/types";

import DeleteDialog from "@/components/general/delete-dialog";
import ContactDeleteForm from "./contact-delete-form";
import ContactEditDialog from "./contact-edit-dialog";
import ContactEditForm from "./contact-edit-form";
import { CalendarClock, SquarePen } from "lucide-react";
import ContactFollowUpForm from "./contact-followup-form";
import ActivityDialog from "../activity/activity-dialog";

interface ContactActionProps {
  contact: Contact;
  team: User[];
}

export default function ContactActions({ contact, team }: ContactActionProps) {
  return (
    <div className="flex flex-row justify-center items-start space-x-3 ml-auto mt-1">
      <ActivityDialog contactId={contact.id} />
      <ContactEditDialog
        contact={contact}
        team={team}
        EditForm={ContactFollowUpForm}
        icon={CalendarClock}
        iconClassName="w-6 h-6 text-green-800 hover:text-green-900 transition-colors duration-200 cursor-pointer"
        title="Follow Up"
        description="Adjust how often you want to follow up with this contact."
      />
      <ContactEditDialog
        contact={contact}
        EditForm={ContactEditForm}
        icon={SquarePen}
        iconClassName="w-6 h-6 text-blue-800 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
        title="Edit Contact"
        description="Keep the contact information updated."
      />
      <DeleteDialog
        id={contact.id}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
        DeleteForm={ContactDeleteForm}
      />
    </div>
  );
}
