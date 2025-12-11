"use client";

import { LeadMagnet } from "@/lib/types";
import { File, ExternalLink, Eye, Plus, FileText } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface LeadMagnetTableProps {
  leadMagnets: LeadMagnet[];
}

export default function LeadMagnetTable({ leadMagnets }: LeadMagnetTableProps) {
  if (!leadMagnets || leadMagnets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Lead Magnets Yet</h3>
        <p className="text-slate-500 text-center max-w-md mb-8">
          You haven&apos;t created any lead magnets yet. Get started by creating your first lead magnet to capture and nurture leads.
        </p>
        <Link href="/lead-magnets/new">
          <Button className="bg-oxford-blue hover:bg-oxford-blue-600 text-white font-semibold px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Create Lead Magnet
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Title
              </TableHead>
              <TableHead className="text-slate-500 font-semibold py-4 px-6">
                Description
              </TableHead>
              <TableHead className="text-slate-500 font-semibold py-4 px-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadMagnets.map((leadMagnet, index) => (
              <TableRow
                key={leadMagnet.id}
                className={`
                  border-b border-slate-50 transition-colors hover:bg-slate-50
                  ${index === leadMagnets.length - 1 ? "border-b-0" : ""}
                `}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <File className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {leadMagnet.title}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <p className="text-slate-600 line-clamp-2">
                    {leadMagnet.description || (
                      <span className="text-slate-300 italic">No description</span>
                    )}
                  </p>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/lead-magnets/${leadMagnet.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <Link
                      href={leadMagnet.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-oxford-blue hover:text-oxford-blue-600 hover:bg-oxford-blue/10 gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {leadMagnets.map((leadMagnet) => (
          <div
            key={leadMagnet.id}
            className="p-5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <File className="w-6 h-6 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">
                  {leadMagnet.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                  {leadMagnet.description || "No description"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <Link href={`/lead-magnets/${leadMagnet.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </Link>
              <Link
                href={leadMagnet.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-oxford-blue hover:bg-oxford-blue-600 text-white gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
