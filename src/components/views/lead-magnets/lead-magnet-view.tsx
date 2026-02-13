"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Automation, LeadMagnet, Platform, Token } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import LeadMagnetHeader from "@/components/lead-magnet/lead-magnet-header";
import LeadMagnetStats from "@/components/lead-magnet/lead-magnet-stats";
import useInstagramMedia from "@/hooks/use-instagram-media";
import InstagramMediaList from "@/components/lead-magnet/instagram-media-list";
import ExistingAutomationsList from "@/components/lead-magnet/existing-automations-list";

interface LeadMagnetViewProps {
  automations: Automation[];
  leadMagnet: LeadMagnet;
  tokens: Token[];
}

export default function LeadMagnetView({
  leadMagnet,
  automations,
  tokens,
}: LeadMagnetViewProps) {
  const instagramToken = tokens?.find(
    (token: Token) => token.platform === Platform.INSTAGRAM,
  )!;

  const instagramMedia = useInstagramMedia(
    instagramToken,
    automations.map((item: Automation) => item.assetId || ""),
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rich-black">
        <div className="container mx-auto px-6 py-8">
          <Link
            href="/lead-magnets"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Lead Magnets</span>
          </Link>

          <div className="mb-8">
            <LeadMagnetHeader leadMagnet={leadMagnet} />
          </div>

          <div className="mb-8">
            <LeadMagnetStats />
          </div>
          <ExistingAutomationsList
            automations={automations}
            tokenId={instagramToken.id}
          />
          <InstagramMediaList
            media={instagramMedia}
            leadMagnetId={leadMagnet.id}
            title="Your Instagram Posts"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
