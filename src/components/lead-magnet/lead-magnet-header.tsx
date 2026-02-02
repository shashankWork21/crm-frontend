"use client";

import { Button } from "@/components/ui/button";
import { LeadMagnet } from "@/lib/types";
import { Check, ExternalLink, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LeadMagnetHeaderProps {
  leadMagnet: LeadMagnet;
}

export default function LeadMagnetHeader({
  leadMagnet,
}: LeadMagnetHeaderProps) {
  const [copied, setCopied] = useState(false);

  const shareableLink = leadMagnet.fileUrl;
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">
          {leadMagnet.title}
        </h1>
        <p className="text-slate-400 text-sm">{leadMagnet.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="h-9 px-3 rounded-lg border-slate-700 bg-oxford-blue hover:bg-oxford-blue/80 text-slate-300"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-1.5 text-green-400" />
          ) : (
            <Link2 className="w-4 h-4 mr-1.5" />
          )}
          {copied ? "Copied" : "Copy Link"}
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-9 px-3 rounded-lg border-slate-700 bg-oxford-blue hover:bg-oxford-blue/80 text-slate-300"
        >
          <Link href={leadMagnet.fileUrl} target="_blank">
            <ExternalLink className="w-4 h-4 mr-1.5" />
            View File
          </Link>
        </Button>
      </div>
    </div>
  );
}
