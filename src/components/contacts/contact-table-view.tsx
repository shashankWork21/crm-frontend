"use client";

import { Users, Plus, UserIcon } from "lucide-react";
import ContactTable from "./contact-table";
import useContact from "@/hooks/use-contact";
import { Button } from "../ui/button";
import Link from "next/link";

interface ContactTableViewProps {
  organisationId: string;
}

export default function ContactTableView({
  organisationId,
}: ContactTableViewProps) {
  const { contacts, isLoading } = useContact(organisationId);

  return (
    <div className="min-h-screen bg-rich-black">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-100">Contacts</h1>
            </div>
            <p className="text-slate-400">Manage and organize your contacts</p>
          </div>
          <Link href="/contacts/new">
            <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-semibold px-5 py-5 rounded-xl shadow-md hover:shadow-lg transition-all gap-2">
              <Plus className="w-5 h-5" />
              Add Contact
            </Button>
          </Link>
        </div>

        {/* Table Card */}
        {contacts && contacts.length > 0 ? (
          <div className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
            <ContactTable contacts={contacts} />
          </div>
        ) : (
          <div className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              No contacts yet
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Get started by adding your first contact to begin managing your
              relationships.
            </p>
            <Link href="/contacts/new">
              <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-semibold px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all gap-2">
                <Plus className="w-5 h-5" />
                Add Your First Contact
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
