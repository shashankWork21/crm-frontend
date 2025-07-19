"use client";
import { Organisation } from "@/lib/types";

import DeleteDialog from "@/components/general/delete-dialog";
import ContactOrgansiationDeleteForm from "./delete-contact-organisation-form";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

interface OrganisationActionProps {
  organisation: Organisation;
}

export default function OrganisationActions({
  organisation,
}: OrganisationActionProps) {
  return (
    <div className="flex flex-row justify-center items-start space-x-3 mx-auto mt-1">
      <Link href={`/dashboard/contacts/organisation/${organisation.id}`}>
        <SquareArrowOutUpRight className="h-6 w-6 text-slate-800 hover:text-slate-600 transition-colors" />
      </Link>
      <DeleteDialog
        id={organisation.id}
        title="Delete Organisation"
        description="Are you sure you want to delete this organisation? This action cannot be undone."
        DeleteForm={ContactOrgansiationDeleteForm}
      />
    </div>
  );
}
