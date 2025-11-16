"use client";

import ProtectedRoute from "@/components/auth/protected-route";

interface DashboardOrganisationViewProps {
  firstName?: string;
}

export default function DashboardView({
  firstName,
}: DashboardOrganisationViewProps) {
  return (
    <ProtectedRoute>
      <div>Dashboard Page View for {firstName}</div>
    </ProtectedRoute>
  );
}
