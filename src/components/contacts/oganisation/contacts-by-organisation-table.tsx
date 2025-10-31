"use client";

import { BranchType, Organisation } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../ui/table";
import OrganisationActions from "./organisation-actions";
import Link from "next/link";
import { Plus } from "lucide-react";
import ContactBulkUploadDialog from "../contact-bulk-upload-dialog";

interface ContactsByOrganisationTableProps {
  organisations: Organisation[];
}

export default function ContactsByOrganisationTable({
  organisations,
}: ContactsByOrganisationTableProps) {
  if (!organisations || organisations.length === 0) {
    return (
      <div className="w-fit mx-auto bg-slate-200 px-10 py-4 rounded-lg text-xl font-semibold text-slate-400 text-center">
        No organisations found.
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto overflow-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <div></div> {/* Spacer */}
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
      <Table className="bg-slate-200 shadow-md text-lg border border-slate-400 mb-20 relative">
        <TableHeader className="bg-slate-300 sticky top-0 z-10">
          <TableRow>
            <TableHead className="font-bold text-center border-r border-slate-400">
              Org Name
            </TableHead>
            <TableHead className="font-bold text-center border-r border-slate-400">
              Address
            </TableHead>
            <TableHead className="font-bold text-center border-r border-slate-400">
              City
            </TableHead>
            <TableHead className="font-bold text-center border-r border-slate-400">
              Region
            </TableHead>
            <TableHead className="font-bold text-center border-r border-slate-400">
              State
            </TableHead>
            <TableHead className="font-bold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organisations.map((organisation: Organisation) => (
            <TableRow key={organisation.id} className="border-none">
              <TableCell className="text-center border-r border-slate-400">
                {organisation.name}
              </TableCell>
              <TableCell className="text-center border-r border-slate-400">
                {
                  organisation.branches?.findLast(
                    (branch) => branch.type === BranchType.HEADQUARTERS
                  )?.address
                }
              </TableCell>
              <TableCell className="text-center border-r border-slate-400">
                {
                  organisation.branches?.findLast(
                    (branch) => branch.type === BranchType.HEADQUARTERS
                  )?.city
                }
              </TableCell>
              <TableCell className="text-center border-r border-slate-400">
                {
                  organisation.branches?.findLast(
                    (branch) => branch.type === BranchType.HEADQUARTERS
                  )?.region?.name
                }
              </TableCell>
              <TableCell className="text-center border-r border-slate-400">
                {
                  organisation.branches?.findLast(
                    (branch) => branch.type === BranchType.HEADQUARTERS
                  )?.region?.state
                }
              </TableCell>
              <TableCell className="text-center">
                <OrganisationActions organisation={organisation} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
