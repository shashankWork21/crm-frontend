"use client";

import { Contact, User } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import ContactActions from "./contact-actions";

interface ContactTableProps {
  contacts: Contact[];
  team: User[];
}

export default function ContactsTable({ contacts, team }: ContactTableProps) {
  return (
    <Table className="w-4/5 mx-auto overflow-scroll bg-slate-200 shadow-md text-md mb-20 border border-slate-400">
      <TableHeader className="bg-slate-300 text-lg">
        <TableRow className="border-none">
          <TableHead className="font-bold text-center border-r border-slate-400">
            Name
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            State
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            Region
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            City
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            Organisation
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            Phone
          </TableHead>
          <TableHead className="font-bold text-center border-r border-slate-400">
            Email
          </TableHead>
          <TableHead className="font-bold text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact: Contact) => (
          <TableRow key={contact.id} className="border-none">
            <TableCell className="text-center border-r border-slate-400">
              {contact.name}
            </TableCell>
            <TableCell className="text-center border-r border-slate-400">
              {contact.branch?.region?.state}
            </TableCell>
            <TableCell className="text-center border-r border-slate-400">
              {contact.branch?.region?.name}
            </TableCell>
            <TableCell className="text-center border-r border-slate-400">
              {contact.branch?.city}
            </TableCell>
            <TableCell className="text-left border-r border-slate-400">
              {contact.branch?.organisation?.name}
            </TableCell>
            <TableCell className="text-center border-r border-slate-400">
              {contact.phoneNumber}
            </TableCell>
            <TableCell className="text-center border-r border-slate-400">
              {contact.email}
            </TableCell>

            <TableCell className="text-center">
              <ContactActions contact={contact} team={team} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
