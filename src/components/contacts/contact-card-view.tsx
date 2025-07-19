"use client";

import { Contact, User } from "@/lib/types";
import ContactCard from "./contact-card";
import { getActivitiesByContactId } from "@/db/activities.queries";

interface ContactCardViewProps {
  contacts: Contact[];
  team: User[];
}
export default function ContactCardView({
  contacts,
  team,
}: ContactCardViewProps) {
  return (
    <div className="flex items-center justify-center w-full mx-auto h-screen flex-wrap gap-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          team={team}
          activityFetchFunction={getActivitiesByContactId.bind(
            null,
            contact.id
          )}
        />
      ))}
    </div>
  );
}
