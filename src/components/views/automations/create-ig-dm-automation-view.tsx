"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import IgCommentDMAutomationForm from "@/components/automations/ig-comment-dm-automation-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateIgDMAutomationViewProps {
  leadMagnetId: string;
  title: string;
  assetId: string;
  assetUrl: string;
  assetType: "instagram_post" | "instagram_story";
}

export default function CreateIgDMAutomationView({
  leadMagnetId,
  title,
  assetId,
  assetUrl,
  assetType,
}: CreateIgDMAutomationViewProps) {
  console.log({ assetId, assetUrl, assetType });
  return (
    <ProtectedRoute>
      <Card className="p-6 md:p-8 lg:p-10 bg-rich-black border border-white/10 rounded-2xl shadow-lg w-9/10 max-w-400 mx-auto mb-20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white mb-4 text-center">
            Setup DM automation for lead magnet
            <span className="block mt-3 text-3xl text-sunglow">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {assetType === "instagram_post" ? (
            <IgCommentDMAutomationForm
              assetId={assetId}
              assetUrl={assetUrl}
              leadMagnetId={leadMagnetId}
            />
          ) : (
            <div>Instagram Story DM Automation Form coming soon!</div>
          )}
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
