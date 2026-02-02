"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateIgDMAutomationViewProps {
  leadMagnetId?: string;
  title: string;
}

export default function CreateIgDMAutomationView({
  leadMagnetId,
  title,
}: CreateIgDMAutomationViewProps) {
  return (
    <ProtectedRoute>
      <Card className="p-6 md:p-8 lg:p-10 bg-sunglow/20 border border-white/10 rounded-2xl shadow-lg max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white mb-4 text-center">
            Setup DM automation for lead magnet
            <span className="block mt-3 text-3xl text-sunglow">{title}</span>
          </CardTitle>
        </CardHeader>
        {/* The rest of the form and UI elements go here */}
      </Card>
    </ProtectedRoute>
  );
}
