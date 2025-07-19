"use client";

import { Tag, TagType } from "@/lib/types";
import ProtectedRoute from "../auth/protected-route";
import TagFormDialog from "../tags/tag-form-dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import TagDisplay from "../tags/tag-display";

interface TagsPageViewProps {
  tags: Tag[];
}

export default function TagsPageView({ tags }: TagsPageViewProps) {
  const [tagCreate, setTagCreate] = useState(false);
  const [tagType, setTagType] = useState<TagType>(TagType.CONTACT);
  const contactTagButton = (
    <button
      onClick={() => {
        setTagCreate(true);
        setTagType(TagType.CONTACT);
      }}
      className="bg-blue-800 text-slate-100 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
  const organisationTagButton = (
    <button
      onClick={() => {
        setTagCreate(true);
        setTagType(TagType.ORGANISATION);
      }}
      className="bg-green-800 text-slate-100 px-3 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md cursor-pointer"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
  const activityTagButton = (
    <button
      onClick={() => {
        setTagCreate(true);
        setTagType(TagType.ACTIVITY);
      }}
      className="bg-yellow-800 text-slate-100 px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors shadow-md cursor-pointer"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
  return (
    <ProtectedRoute>
      <div className="w-full mx-auto mt-10 h-fit flex flex-col items-center justify-center space-y-10">
        <div className="flex flex-row justify-between items-center w-4/5 mx-auto mb-10">
          <h1 className="text-center font-bold text-2xl">Tags</h1>
        </div>
        <div className="w-4/5 flex flex-col items-start justify-start space-y-4">
          <div className="flex flex-row justify-start items-center w-full space-x-3 mx-auto mb-5">
            <h3 className="text-xl font-semibold text-blue-700">
              Contact Tags:
            </h3>
            <TagFormDialog
              title="Create new Tag"
              description="Create a new tag to categorise contacts, organisations and activities"
              button={contactTagButton}
              id={null}
              tagEdit={tagCreate}
              setTagEdit={setTagCreate}
              defaultValues={{
                title: "",
                description: "",
                tagType,
              }}
              submitFormText="Create Tag"
            />
          </div>
          <TagDisplay
            tags={tags.filter((tag: Tag) => tag.tagType === TagType.CONTACT)}
            tagType={TagType.CONTACT}
          />
        </div>
        <div className="w-4/5 flex flex-col items-start justify-start space-y-4">
          <div className="flex flex-row justify-start items-center w-full space-x-3 mx-auto mb-5">
            <h3 className="text-xl font-semibold text-green-700">
              Organisation Tags:
            </h3>
            <TagFormDialog
              title="Create new Tag"
              description="Create a new tag to categorise contacts, organisations and activities"
              button={organisationTagButton}
              id={null}
              tagEdit={tagCreate}
              setTagEdit={setTagCreate}
              defaultValues={{
                title: "",
                description: "",
                tagType,
              }}
              submitFormText="Create Tag"
            />
          </div>
          <TagDisplay
            tags={tags.filter(
              (tag: Tag) => tag.tagType === TagType.ORGANISATION
            )}
            tagType={TagType.ORGANISATION}
          />
        </div>
        <div className="w-4/5 flex flex-col items-start justify-start space-y-4">
          <div className="flex flex-row justify-start items-center w-full space-x-3 mx-auto mb-5">
            <h3 className="text-xl font-semibold text-yellow-700">
              Activity Tags:
            </h3>
            <TagFormDialog
              title="Create new Tag"
              description="Create a new tag to categorise contacts, organisations and activities"
              button={activityTagButton}
              id={null}
              tagEdit={tagCreate}
              setTagEdit={setTagCreate}
              defaultValues={{
                title: "",
                description: "",
                tagType,
              }}
              submitFormText="Create Tag"
            />
          </div>
          <TagDisplay
            tags={tags.filter((tag: Tag) => tag.tagType === TagType.ACTIVITY)}
            tagType={TagType.ACTIVITY}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
