"use client";

import { Tag, TagType } from "@/lib/types";
import TagCard from "./tag-card";
import { tagBGs } from "@/lib/tags";

interface TagsPageViewProps {
  tags: Tag[];
  tagType: TagType;
}

export default function TagDisplay({ tags, tagType }: TagsPageViewProps) {
  const { bg, header } = tagBGs[tagType];
  const tagDisplay =
    tags.length > 0 ? (
      <div className="w-full flex flex-row space-x-4 flex-wrap">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
    ) : (
      <div
        className={`w-2/5 mx-auto mt-6 py-3 px-5 text-center text-xl ${bg} ${header} rounded-lg`}
      >
        No tags found of type{" "}
        <span className="font-bold mr-2">
          {tagType.charAt(0).toUpperCase() + tagType.slice(1).toLowerCase()}.
        </span>
        Please create one
      </div>
    );

  return tagDisplay;
}
