"use client";

import { useState } from "react";
import ProtectedRoute from "../../auth/protected-route";
import ContactBulkUploadDialog from "../../contacts/contact-bulk-upload-dialog";
import ContactsFilter from "../../contacts/contacts-filter";
import { Contact, User } from "@/lib/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import ContactsTable from "@/components/contacts/contacts-table";

interface ContactPageViewProps {
  contacts: Contact[];
  team: User[];
}

export default function ContactPageView({
  contacts,
  team,
}: ContactPageViewProps) {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

  const handleFilteredContacts = (filtered: Contact[]) => {
    setFilteredContacts(filtered);
  };

  console.log(JSON.stringify(contacts));
  return (
    <ProtectedRoute>
      <div className="">
        <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-3 items-center justify-between my-10">
          <h1 className="text-2xl font-bold">Contacts</h1>

          <div className="flex flex-row items-center gap-4">
            <Link
              href="/dashboard/contacts/new"
              className="bg-slate-800 text-white pl-4 pr-2 py-2 rounded hover:bg-slate-600 transition-colors cursor-pointer shadow-md flex items-center"
            >
              <Plus className="inline mr-2" />
            </Link>
            <ContactBulkUploadDialog />
          </div>
        </div>

        {/* Filter Component */}
        {!!contacts && contacts.length > 0 && (
          <ContactsFilter
            contacts={contacts}
            onFilteredContacts={handleFilteredContacts}
          />
        )}

        <div>
          {!!contacts && contacts.length > 0 ? (
            <>
              {/* Results count */}
              <div className="w-4/5 mx-auto mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredContacts.length} of {contacts.length}{" "}
                  contacts
                  {filteredContacts.length !== contacts.length && " (filtered)"}
                </p>
              </div>

              {filteredContacts.length > 0 ? (
                <ContactsTable contacts={filteredContacts} team={team} />
              ) : (
                <div className="w-4/5 mx-auto mt-10 text-center">
                  <h1 className="text-xl font-bold text-gray-600 mb-2">
                    No contacts match your filters
                  </h1>
                  <p className="text-gray-500">
                    Try adjusting your filter criteria to see more results.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="w-4/5 mx-auto mt-10">
              <h1 className="text-2xl font-bold">No Contacts Found</h1>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
