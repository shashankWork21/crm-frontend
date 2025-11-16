"use client";

import { LeadMagnet } from "@/lib/types";
import { format } from "date-fns";
import { FileText, Link2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface LeadMagnetTableProps {
  leadMagnets: LeadMagnet[];
}

export default function LeadMagnetTable({ leadMagnets }: LeadMagnetTableProps) {
  if (!leadMagnets || leadMagnets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 rounded-lg border border-dashed border-powder-blue/30 bg-oxford-blue/5">
        <FileText className="h-12 w-12 text-powder-blue/40 mb-3" />
        <p className="text-sm font-medium text-rich-black/60">
          No lead magnets yet
        </p>
        <p className="text-xs text-rich-black/40 mt-1">
          Create your first lead magnet to get started
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-powder-blue-600 hover:bg-powder-blue border-none">
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Title
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Description
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              File
            </TableHead>
            <TableHead className="text-oxford-blue font-semibold text-sm">
              Created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {leadMagnets.map((leadMagnet) => (
            <TableRow
              key={leadMagnet.id}
              className="group hover:bg-powder-blue/10 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-8 h-8 bg-linear-to-br from-sunglow/20 to-sunglow/10 rounded flex items-center justify-center">
                    <FileText className="h-4 w-4 text-sunglow" />
                  </div>
                  <span className="font-medium text-rich-black text-sm">
                    {leadMagnet.title}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-rich-black/70">
                {leadMagnet.description || (
                  <span className="text-rich-black/40 italic">
                    No description
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Link
                  href={leadMagnet.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-rich-black hover:text-oxford-blue transition-colors"
                >
                  <Link2 className="h-4 w-4" />
                  <span className="text-sm font-medium">View</span>
                </Link>
              </TableCell>
              <TableCell className="text-rich-black/60 text-sm">
                {format(new Date(leadMagnet.createdAt), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
