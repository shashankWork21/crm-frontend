"use client";

import ProtectedRoute from "../../auth/protected-route";
import ContactBulkUploadDialog from "../../contacts/contact-bulk-upload-dialog";
import { Contact, User } from "@/lib/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import ContactCardView from "@/components/contacts/contact-card-view";

interface ContactPageViewProps {
  contacts: Contact[];
  team: User[];
}

export default function ContactPageView({
  contacts,
  team,
}: ContactPageViewProps) {
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
        <div>
          {!!contacts && contacts.length > 0 ? (
            <ContactCardView contacts={contacts} team={team} />
          )
            : (
              <div className="w-4/5 mx-auto mt-10">
                <h1 className="text-2xl font-bold">No Contacts Found</h1>
              </div>
            )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
