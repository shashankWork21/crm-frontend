"use client";

import { Contact, User } from "@/lib/types";
import ContactCard from "./contact-card";
import { getActivitiesByContactId } from "@/db/activities.queries";

interface ContactCardViewProps {
  contacts: Contact[];
  team: User[];
  successCallback?: () => void;
}
export default function ContactCardView({
  contacts,
  team,
  successCallback,
}: ContactCardViewProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full mx-auto h-screen gap-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          team={team}
          activityFetchFunction={getActivitiesByContactId.bind(
            null,
            contact.id
          )}
          successCallback={successCallback}
        />
      ))}
    </div>
  );
}
