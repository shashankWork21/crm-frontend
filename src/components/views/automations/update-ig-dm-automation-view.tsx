"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import IgCommentDMAutomationForm from "@/components/automations/ig-comment-dm-automation-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Automation } from "@/lib/types";

interface CreateIgDMAutomationViewProps {
  defaultValues: Automation;
}

export default function UpdateIgDMAutomationView({
  defaultValues,
}: CreateIgDMAutomationViewProps) {
  return (
    <ProtectedRoute>
      <Card className="p-6 md:p-8 lg:p-10 bg-rich-black border border-white/10 rounded-2xl shadow-lg w-9/10 max-w-400 mx-auto mb-20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white mb-4 text-center">
            Update Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IgCommentDMAutomationForm
            assetId={defaultValues?.assetId!}
            assetUrl={defaultValues?.assetUrl!}
            leadMagnetId={defaultValues?.leadMagnetId!}
            defaultValues={defaultValues}
            editMode={true}
          />
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
