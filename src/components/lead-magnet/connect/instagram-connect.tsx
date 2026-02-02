"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InstagramConnectProps {
  authenticated: boolean;
}

export default function InstagramConnect({
  authenticated,
}: InstagramConnectProps) {
  return (
    <div className="flex-1 min-w-0">
      {authenticated ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-100">Instagram DMs</h3>
            <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Connected
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Your Instagram account is connected. Leads will automatically be
            captured when users DM the trigger word.
          </p>
          <Link href="/api/auth/instagram">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-slate-100 rounded-lg h-9 px-4 text-sm font-medium"
            >
              Reconnect Instagram
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-100">Instagram DMs</h3>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">
              Recommended
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            When users DM a trigger word, automatically send them the lead
            magnet and capture their info as a contact.
          </p>
          <Link href="/api/auth/instagram">
            <Button className="bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-medium rounded-lg h-10 px-4">
              Connect Instagram
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
