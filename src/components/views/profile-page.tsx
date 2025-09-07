"use client";

import ProtectedRoute from "../auth/protected-route";
import { useEffect, useState } from "react";
import { Organisation, User } from "@/lib/types";
import { getOrganisationById } from "@/db/organisation.queries";
import ProfileCard from "../profile/profile-card";

interface ProfilePageViewProps {
  user: User;
}

export default function ProfilePageView({ user }: ProfilePageViewProps) {
  const [organisation, setOrganisation] = useState<Organisation | null>(null);

  useEffect(() => {
    async function getOrganisation() {
      if (user) {
        const organisation = await getOrganisationById(
          user?.organisationId as string as string
        );
        setOrganisation(organisation);
      }
    }
    getOrganisation();
  }, [user]);

  return (
    <ProtectedRoute>
      {!user || !organisation ? (
        <div className="bg-slate-200 w-fit mx-auto text-slate-800 font-semibold text-2xl px-6 py-3 rounded-lg">
          Loading
        </div>
      ) : (
        <ProfileCard user={user} organisation={organisation} />
      )}
    </ProtectedRoute>
  );
}
