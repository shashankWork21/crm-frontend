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

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-powder-blue-600 hover:bg-powder-blue">
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Name
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Email
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Phone
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Gender
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              className="group hover:bg-powder-blue/10 transition-colors"
            >
              <TableCell>{contact?.name || ""}</TableCell>
              <TableCell>{contact?.email || ""}</TableCell>
              <TableCell>{contact?.phoneNumber || ""}</TableCell>
              <TableCell>{contact?.gender || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
