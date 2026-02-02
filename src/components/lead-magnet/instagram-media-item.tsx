"use client";

import { InstagramMedia } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  VideoIcon,
  ImagesIcon,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface InstagramMediaItemProps {
  post: InstagramMedia;
  leadMagnetId?: string;
}

const mediaTypeConfig = {
  IMAGE: {
    icon: ImageIcon,
    label: "Image",
    className: "bg-powder-blue-600/90 text-rich-black",
  },
  VIDEO: {
    icon: VideoIcon,
    label: "Video",
    className: "bg-oxford-blue/90 text-white",
  },
  CAROUSEL_ALBUM: {
    icon: ImagesIcon,
    label: "Carousel",
    className: "bg-cg-blue/90 text-white",
  },
};

export default function InstagramMediaItem({
  post,
  leadMagnetId,
}: InstagramMediaItemProps) {
  const mediaConfig = mediaTypeConfig[post.media_type];
  const MediaIcon = mediaConfig.icon;
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), {
    addSuffix: true,
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-powder-blue-700/30 bg-linear-to-b from-rich-black-500 to-rich-black-400 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-powder-blue-400/10 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          loading="eager"
          src={post.thumbnail_url || post.media_url}
          alt={post.alt_text || post.caption || `Instagram post ${post.id}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-rich-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Media Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${mediaConfig.className} gap-1.5 px-2.5 py-1`}>
            <MediaIcon className="size-3.5" />
            <span className="text-xs font-medium">{mediaConfig.label}</span>
          </Badge>
        </div>

        {/* External Link */}
        <Link
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-rich-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-powder-blue hover:text-rich-black group-hover:opacity-100"
          aria-label="View on Instagram"
        >
          <ExternalLink className="size-4" />
        </Link>

        {/* Video Play Indicator */}
        {post.media_type === "VIDEO" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-rich-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <div className="ml-1 size-0 border-y-8 border-l-12 border-y-transparent border-l-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Caption */}
        {post.caption && (
          <p className="line-clamp-2 text-sm text-powder-blue-700 leading-relaxed">
            {post.caption}
          </p>
        )}

        {/* Timestamp */}
        <span className="text-xs text-powder-blue-600/70">{timeAgo}</span>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <Button
            asChild
            className="w-full bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold transition-all duration-300"
          >
            <Link href={`/lead-magnets/${leadMagnetId}/automations/instagram`}>
              <Sparkles className="size-4" />
              Setup Automation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
