import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siInstagram } from "simple-icons";
import Link from "next/link";
import { Token } from "@/lib/types";
import InstagramConnect from "./connect/instagram-connect";

interface LeadMagnetDistributionProps {
  tokens: Token[];
}

export default function LeadMagnetDistribution({
  tokens,
}: LeadMagnetDistributionProps) {
  return (
    <Card className="bg-oxford-blue border-slate-700 rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-100 mb-1">
            Set Up Distribution
          </h2>
          <p className="text-sm text-slate-400">
            Connect a channel to start capturing leads automatically
          </p>
        </div>

        {/* Instagram Channel */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-white"
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={siInstagram.path} />
              </svg>
            </div>
            <InstagramConnect
              authenticated={tokens?.some((t) => t.instagramId !== null)}
            />
          </div>
        </div>

        {/* More channels coming soon */}
        <div className="px-6 pb-6">
          <div className="border border-dashed border-slate-600 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-500">
              More distribution channels coming soon — Email, WhatsApp, Landing
              Pages
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
