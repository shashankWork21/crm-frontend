"use client";

import { Plus, Magnet } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/protected-route";
import LeadMagnetDistribution from "@/components/lead-magnet/lead-magnet-distribution";
import LeadMagnetSteps from "@/components/lead-magnet/lead-magnet-steps";
import LeadMagnetTable from "@/components/lead-magnet/lead-magnet-table";
import { Button } from "@/components/ui/button";
import { LeadMagnet, Token } from "@/lib/types";

interface LeadMagnetTableViewProps {
  leadMagnets: LeadMagnet[];
  tokens: Token[];
}

export default function LeadMagnetTableView({
  leadMagnets,
  tokens,
}: LeadMagnetTableViewProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rich-black">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-sunglow-500 flex items-center justify-center">
                  <Magnet className="w-5 h-5 text-rich-black" />
                </div>
                <h1 className="text-2xl font-bold text-slate-100">
                  Lead Magnets
                </h1>
              </div>
              <p className="text-slate-400">
                Create and manage your lead magnets to capture more leads
              </p>
            </div>

            {leadMagnets.length > 0 && (
              <Link href="/lead-magnets/new">
                <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-semibold px-5 py-5 rounded-xl shadow-md hover:shadow-lg transition-all gap-2">
                  <Plus className="w-5 h-5" />
                  Create
                </Button>
              </Link>
            )}
          </div>
          <div className="mx-auto mb-8">
            <LeadMagnetSteps />
          </div>

          {/* Table */}
          <div className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
            <LeadMagnetTable leadMagnets={leadMagnets} />
          </div>
          <div className="mx-auto my-8">
            <LeadMagnetDistribution tokens={tokens} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
