"use client";

import Link from "next/link";

import { Circle, CheckCircle } from "lucide-react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InstagramBrandIcon from "@/components/lead-magnet/instagram-brand-icon";
import { Automation, LeadMagnet, Platform, Token } from "@/lib/types";
import useInstagramMedia from "@/hooks/use-instagram-media";
import InstagramMediaListReviewer from "@/components/lead-magnet/instagram-media-list-reviewer";
import ExistingAutomationsList from "@/components/lead-magnet/existing-automations-list";

interface InstagramReviewViewProps {
  leadMagnet: LeadMagnet;
  tokens: Token[];
  automations: Automation[];
}

export default function InstagramReviewView({
  leadMagnet,
  tokens,
  automations,
}: InstagramReviewViewProps) {
  const instagramToken = tokens?.find(
    (token: Token) => token.platform === Platform.INSTAGRAM,
  )!;

  const instagramMedia = useInstagramMedia(
    instagramToken,
    automations.map((item: Automation) => item.assetId || ""),
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rich-black px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="bg-oxford-blue border border-white/10 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <InstagramBrandIcon className="w-7 h-7 text-sunglow-500" />
                Instagram Review Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300">
                Follow the steps below to run the reviewer-ready DM automation
                flow.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-rich-black p-4">
                  <div className="flex items-start gap-3">
                    {!!instagramToken ? (
                      <CheckCircle className="w-5 h-5 text-sunglow-500 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-sunglow-500 mt-0.5" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">
                        Step 1: Connect Instagram account
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Connect the reviewer Instagram account that will receive
                        DMs.
                      </p>
                      <Link
                        href="/api/auth/instagram"
                        className="inline-block mt-3"
                      >
                        {!!instagramToken ? (
                          <Button className="border border-sunglow bg-transparent text-sunglow hover:bg-oxford-blue-400 font-semibold">
                            Reconnect Instagram
                          </Button>
                        ) : (
                          <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-semibold">
                            Connect Instagram
                          </Button>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-rich-black p-4">
                  <div className="flex items-start gap-3">
                    {automations.length === 0 ? (
                      <Circle className="w-5 h-5 text-sunglow-500 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-sunglow-500 mt-0.5" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">
                        Step 2: Setup default automation in one click
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        This creates a default comment-to-DM automation with
                        keyword{" "}
                        <span className="text-sunglow-500">reviewdemo</span>.
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <ExistingAutomationsList automations={automations} />
                  </div>
                  <div className="w-full mt-5">
                    <InstagramMediaListReviewer
                      media={instagramMedia}
                      leadMagnetId={leadMagnet?.id}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-rich-black p-4">
                  <div className="flex items-start gap-3">
                    <Circle className="w-5 h-5 text-sunglow-500 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold">
                        Step 3: Test the flow on Instagram
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Comment{" "}
                        <span className="text-sunglow-500">reviewdemo</span> on
                        the connected post. If the account follows the creator,
                        the lead magnet DM is sent. If not, it receives a follow
                        prompt and can retry using{" "}
                        <span className="text-sunglow-500">I'm Following</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
