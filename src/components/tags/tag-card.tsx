"use client";

import { tagBGs } from "@/lib/tags";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tag } from "@/lib/types";
import TagActions from "./tag-actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export interface TagCardProps {
  tag: Tag;
}

export default function TagCard({ tag }: TagCardProps) {
  const { bg, header, icon } = tagBGs[tag.tagType];

  return (
    <Card className={`w-9/10 md:w-1/3 xl:w-1/5 ${bg} border-none`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className={`${header} cursor-pointer`}>
              {tag.title}
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            <CardDescription
              className={`${header
                .split("-")
                .map((_, index) => (index === 0 ? "bg" : _))
                .join("-")} text-white px-2 py-1 text-xs rounded-lg`}
            >
              {tag.description || "No description"}
            </CardDescription>
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-row items-center space-x-2">
          {icon}
          <TagActions tag={tag} />
        </div>
      </CardHeader>
    </Card>
  );
}
