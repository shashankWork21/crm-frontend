"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import LeadMagnetTable from "@/components/lead-magnet/lead-magnet-table";
import { LeadMagnet } from "@/lib/types";
import { Plus } from "lucide-react";
import Link from "next/link";

interface LeadMagnetViewProps {
  leadMagnets: LeadMagnet[];
}

export default function LeadMagnetView({ leadMagnets }: LeadMagnetViewProps) {
  return (
    <ProtectedRoute>
      <div className="w-9/10 mx-auto">
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">Lead Magnets</h2>
          <Link
            href="/lead-magnets/new"
            className="bg-oxford-blue text-white px-4 py-2 rounded-lg hover:bg-oxford-blue-600 transition flex flex-row items-center"
          >
            <Plus className="inline-block mr-1 h-5 w-5" />
            Create
          </Link>
        </div>
        <LeadMagnetTable leadMagnets={leadMagnets} />
      </div>
    </ProtectedRoute>
  );
}
