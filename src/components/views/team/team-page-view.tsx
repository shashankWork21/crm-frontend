"use client";

import { User } from "@/lib/types";
import TeamTable from "@/components/team/team-table";
import { Users } from "lucide-react";

interface TeamPageViewProps {
  team: User[];
}

export default function TeamPageView({ team }: TeamPageViewProps) {
  return (
    <div className="min-h-screen bg-rich-black p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                Team Members
              </h1>
              <p className="text-slate-400 text-sm">
                Manage your team and their roles
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            {team.length} {team.length === 1 ? "member" : "members"}
          </div>
        </div>

        {/* Team Table */}
        <TeamTable team={team} />
      </div>
    </div>
  );
}
