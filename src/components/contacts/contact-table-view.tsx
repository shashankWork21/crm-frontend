"use client";

import { Users } from "lucide-react";
import ContactTable from "./contact-table";
import useContact from "@/hooks/use-contact";

interface ContactTableViewProps {
  organisationId: string;
}

export default function ContactTableView({
  organisationId,
}: ContactTableViewProps) {
  const {
    contacts,
    isLoading,
    handleFieldSelection,
    directFields,
    relationalFields,
  } = useContact(organisationId);

  return (
    <div className="w-9/10 mx-auto mt-8 px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-powder-blue-700/20">
        <div className="bg-powder-blue px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Users className="h-6 w-6 text-oxford-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-oxford-blue">Contacts</h2>
            </div>
            <div className="ml-auto flex items-center gap-3">
              {/* Field Selector */}
            </div>
          </div>
        </div>

        {/* Contact Table */}
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
}
