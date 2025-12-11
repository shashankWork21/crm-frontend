"use client";

import ContactCreateForm from "@/components/contacts/contact-create-form";
import { useAuth } from "@/context/auth.context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateContactView() {
  const { user } = useAuth();
  const organisationId = user?.organisationId;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/contacts"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contacts</span>
        </Link>

        <ContactCreateForm organisationId={organisationId as string} />
      </div>
    </div>
  );
}
