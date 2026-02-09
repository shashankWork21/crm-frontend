"use client";

import { useState, useMemo } from "react";
import { InstagramMedia } from "@/lib/types";
import InstagramMediaItem from "./instagram-media-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ImageIcon,
  VideoIcon,
  ImagesIcon,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InstagramBrandIcon from "./instagram-brand-icon";

interface InstagramMediaListProps {
  leadMagnetId?: string;
  media: InstagramMedia[];
  title?: string;
  defaultOpen?: boolean;
}

type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
type ViewMode = "grid" | "compact";

const mediaTypeLabels: Record<
  MediaType,
  { label: string; icon: typeof ImageIcon }
> = {
  IMAGE: { label: "Images", icon: ImageIcon },
  VIDEO: { label: "Videos", icon: VideoIcon },
  CAROUSEL_ALBUM: { label: "Carousels", icon: ImagesIcon },
};

export default function InstagramMediaList({
  media,
  leadMagnetId,
  title = "Instagram Posts",
  defaultOpen = true,
}: InstagramMediaListProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedTypes, setSelectedTypes] = useState<Set<MediaType>>(
    new Set(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Calculate media counts by type
  const mediaCounts = useMemo(() => {
    return media.reduce(
      (acc, post) => {
        acc[post.media_type] = (acc[post.media_type] || 0) + 1;
        return acc;
      },
      {} as Record<MediaType, number>,
    );
  }, [media]);

  // Filter media based on selected types
  const filteredMedia = useMemo(() => {
    return media.filter((post) => selectedTypes.has(post.media_type));
  }, [media, selectedTypes]);

  const toggleMediaType = (type: MediaType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        // Don't allow deselecting all types
        if (next.size > 1) {
          next.delete(type);
        }
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const hasMedia = media.length > 0;
  const isFiltered = selectedTypes.size < 3;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl border border-powder-blue-700/30 bg-linear-to-r from-rich-black-500 to-rich-black-400 p-4 mb-4">
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-3 group focus:outline-none">
            <div className="flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-pink-500 via-purple-500 to-orange-400">
              <InstagramBrandIcon className="size-8 text-powder-blue-600/50" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-powder-blue-800 group-hover:text-powder-blue transition-colors">
                {title}
              </span>
              <span className="text-xs text-powder-blue-600/70">
                {hasMedia
                  ? `${filteredMedia.length} of ${media.length} posts${isFiltered ? " (filtered)" : ""}`
                  : "No posts available"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "size-5 text-powder-blue-600 transition-transform duration-300 ml-2",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </CollapsibleTrigger>

        {hasMedia && (
          <div className="flex items-center gap-3">
            {/* Media Type Stats */}
            <div className="hidden md:flex items-center gap-2">
              {(Object.keys(mediaTypeLabels) as MediaType[]).map((type) => {
                const count = mediaCounts[type] || 0;
                if (count === 0) return null;
                const TypeIcon = mediaTypeLabels[type].icon;
                return (
                  <Badge
                    key={type}
                    variant="outline"
                    className="gap-1.5 px-2.5 py-1 text-powder-blue-700 border-powder-blue-700/30"
                  >
                    <TypeIcon className="size-3.5" />
                    <span>{count}</span>
                  </Badge>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-powder-blue-700/30 p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-powder-blue text-rich-black"
                    : "text-powder-blue-600 hover:text-powder-blue",
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={cn(
                  "flex size-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "compact"
                    ? "bg-powder-blue text-rich-black"
                    : "text-powder-blue-600 hover:text-powder-blue",
                )}
                aria-label="Compact view"
              >
                <List className="size-4" />
              </button>
            </div>

            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "gap-2 border-powder-blue-700/30 text-powder-blue-700 hover:bg-powder-blue-700/10 hover:text-powder-blue",
                    isFiltered && "border-sunglow text-sunglow",
                  )}
                >
                  <Filter className="size-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-rich-black-400 border-powder-blue-700/30"
              >
                {(Object.keys(mediaTypeLabels) as MediaType[]).map((type) => {
                  const { label, icon: TypeIcon } = mediaTypeLabels[type];
                  const count = mediaCounts[type] || 0;
                  return (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={selectedTypes.has(type)}
                      onCheckedChange={() => toggleMediaType(type)}
                      disabled={count === 0}
                      className="text-powder-blue-700 focus:bg-powder-blue-700/20 focus:text-powder-blue"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <TypeIcon className="size-4" />
                        <span>{label}</span>
                        <Badge
                          variant="secondary"
                          className="ml-auto px-1.5 py-0 text-xs bg-rich-black-500"
                        >
                          {count}
                        </Badge>
                      </div>
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Content */}
      <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2 overflow-hidden">
        {hasMedia ? (
          <div
            className={cn(
              "gap-4",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
            )}
          >
            {filteredMedia.map((post) => (
              <InstagramMediaItem
                key={post.id}
                post={post}
                leadMagnetId={leadMagnetId}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-powder-blue-700/30 bg-rich-black-500/50 py-16 px-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-linear-to-br from-pink-500/20 via-purple-500/20 to-orange-400/20 mb-4">
              <InstagramBrandIcon className="size-8 text-powder-blue-600/50" />
            </div>
            <h3 className="text-lg font-semibold text-powder-blue-700 mb-2">
              No Instagram Posts
            </h3>
            <p className="text-sm text-powder-blue-600/70 text-center max-w-sm">
              Connect your Instagram account to start displaying your posts and
              setting up automations.
            </p>
          </div>
        )}

        {/* Show message when all filtered out */}
        {hasMedia && filteredMedia.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-powder-blue-700/30 bg-rich-black-500/50 py-12 px-6">
            <Filter className="size-10 text-powder-blue-600/50 mb-3" />
            <p className="text-sm text-powder-blue-600/70 text-center">
              No posts match the current filter. Try adjusting your filter
              settings.
            </p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
