"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import ContactsByOrganisationTable from "@/components/contacts/oganisation/contacts-by-organisation-table";
import { Organisation } from "@/lib/types";

interface ContactsByOrganisationViewProps {
  organisations: Organisation[];
}

export default function ContactsByOrganisationView({
  organisations,
}: ContactsByOrganisationViewProps) {
  return (
    <ProtectedRoute>
      <div className="w-full relative">
        <ContactsByOrganisationTable organisations={organisations} />
      </div>
    </ProtectedRoute>
  );
}
