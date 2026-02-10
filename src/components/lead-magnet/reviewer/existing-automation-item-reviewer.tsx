"use client";

import { Automation, Platform, Token, TriggerType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Pencil,
  Power,
  PowerOff,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { getTriggerTypeLabel } from "@/lib/utils";
import CommentSection from "./comment-section";

interface ExistingAutomationItemProps {
  tokens: Token[];
  automation: Automation;
  onToggleActive?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function ExistingAutomationItemReviewer({
  tokens,
  automation,
  onToggleActive,
  onDelete,
}: ExistingAutomationItemProps) {
  const isActive = automation.isActive;

  const instagramToken = tokens.find(
    (token: Token) => token.platform === Platform.INSTAGRAM,
  );

  return (
    <div className="group relative bg-oxford-blue border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-rich-black/70 to-transparent z-5" />

        {/* Status Indicator */}
        <div className="absolute top-3 left-3 z-10">
          <Badge
            className={`${
              isActive
                ? "bg-green-700 text-white border-emerald-400 shadow-lg shadow-emerald-500/30"
                : "bg-red-700 text-white border-red-400 shadow-lg shadow-red-500/30"
            } border backdrop-blur-sm font-medium`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-1.5 ${
                isActive ? "bg-green-50 animate-pulse" : "bg-red-50"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <Image
          src={automation.assetUrl!}
          alt="Automation Asset"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-rich-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Trigger Info */}
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-sunglow" />
          <span className="text-sm text-white/70">Trigger:</span>
          <Badge
            variant="outline"
            className="text-xs border-white/20 text-white/80"
          >
            {getTriggerTypeLabel(automation.triggerType)}
          </Badge>
        </div>

        {/* Keywords */}
        {automation.triggerType === TriggerType.COMMENT_KEYWORD &&
          automation.triggerValues.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {automation.triggerValues.slice(0, 3).map((keyword, index) => (
                <Badge
                  key={index}
                  className="bg-sunglow/10 text-sunglow border border-sunglow/20 text-xs"
                >
                  {keyword}
                </Badge>
              ))}
              {automation.triggerValues.length > 3 && (
                <Badge className="bg-white/5 text-white/50 border border-white/10 text-xs">
                  +{automation.triggerValues.length - 3} more
                </Badge>
              )}
            </div>
          )}

        {/* Response Preview */}
        {automation.responseContent && (
          <div className="flex items-start gap-2">
            <MessageSquare className="size-4 text-white/50 mt-0.5 shrink-0" />
            <p className="text-xs text-white/50 line-clamp-2">
              {automation.responseContent}
            </p>
          </div>
        )}

        {/* Created Date */}
        <p className="text-xs text-white/30">
          Created {format(new Date(automation.createdAt), "MMM d, yyyy")}
        </p>

        {/* Comments */}
        <CommentSection
          assetId={automation.assetId}
          accessToken={instagramToken?.accessToken}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <Link href={`/automations/${automation.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-sunglow border-white/10 text-rich-black hover:bg-sunglow-600"
            >
              <Pencil className="size-3.5 mr-1.5" />
              Edit
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleActive?.(automation.id, !isActive)}
            className={`${
              isActive
                ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
            }`}
            title={isActive ? "Deactivate" : "Activate"}
          >
            {isActive ? (
              <PowerOff className="size-3.5" />
            ) : (
              <Power className="size-3.5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(automation.id)}
            className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            title="Delete"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
