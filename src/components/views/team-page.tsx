"use client";

import { User } from "@/lib/types";
import ProtectedRoute from "../auth/protected-route";
import TeamTable from "../team/team-table";

interface TeamPageViewProps {
  team: User[];
}

export default function TeamPageView({ team }: TeamPageViewProps) {
  return (
    <ProtectedRoute>
      <div className="w-full mx-auto mt-10 h-fit flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-row justify-between items-center w-4/5 mx-auto mb-10">
          <h1 className="text-center font-bold text-2xl">Manage Team</h1>
        </div>
        <TeamTable team={team} />
      </div>
    </ProtectedRoute>
  );
}
