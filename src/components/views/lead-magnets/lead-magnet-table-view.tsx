"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import LeadMagnetTable from "@/components/lead-magnet/lead-magnet-table";
import { Button } from "@/components/ui/button";
import { LeadMagnet } from "@/lib/types";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

interface LeadMagnetTableViewProps {
  leadMagnets: LeadMagnet[];
}

export default function LeadMagnetTableView({
  leadMagnets,
}: LeadMagnetTableViewProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Lead Magnets</h1>
              </div>
              <p className="text-slate-500">
                Create and manage your lead magnets to capture more leads
              </p>
            </div>
            {leadMagnets.length > 0 && (
              <Link href="/lead-magnets/new">
                <Button className="bg-oxford-blue hover:bg-oxford-blue-600 text-white font-semibold px-5 py-5 rounded-xl shadow-md hover:shadow-lg transition-all gap-2">
                  <Plus className="w-5 h-5" />
                  Create
                </Button>
              </Link>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <LeadMagnetTable leadMagnets={leadMagnets} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
