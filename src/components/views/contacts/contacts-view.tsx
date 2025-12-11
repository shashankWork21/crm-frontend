"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import ContactTableView from "@/components/contacts/contact-table-view";
import { useAuth } from "@/context/auth.context";

export default function ContactsView() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="px-6">
        <ContactTableView organisationId={user?.organisationId || ""} />
      </div>
    </ProtectedRoute>
  );
}
