"use client";

import { Contact } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Mail, Phone } from "lucide-react";

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Name
              </TableHead>
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Email
              </TableHead>
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Phone
              </TableHead>
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Gender
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow
                key={contact.id}
                className={`
                  border-b border-slate-50 transition-colors hover:bg-slate-50
                  ${index === contacts.length - 1 ? "border-b-0" : ""}
                `}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-oxford-blue/10 flex items-center justify-center text-oxford-blue font-semibold text-sm">
                      {contact?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <span className="font-medium text-slate-900">
                      {contact?.name || "—"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-slate-600">
                  {contact?.email || <span className="text-slate-300">—</span>}
                </TableCell>
                <TableCell className="py-4 px-6 text-slate-600">
                  {contact?.phoneNumber || (
                    <span className="text-slate-300">—</span>
                  )}
                </TableCell>
                <TableCell className="py-4 px-6">
                  {contact?.gender ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                      {contact.gender.toLowerCase()}
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {contacts.map((contact) => (
          <div key={contact.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-oxford-blue/10 flex items-center justify-center text-oxford-blue font-semibold shrink-0">
                {contact?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">
                  {contact?.name || "Unknown"}
                </h3>
                {contact?.email && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
                {contact?.phoneNumber && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{contact.phoneNumber}</span>
                  </div>
                )}
              </div>
              {contact?.gender && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                  {contact.gender.toLowerCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
