"use client";

import { tagBGs } from "@/lib/tags";
import { Tag } from "@/lib/types";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import TagFormDialog from "./tag-form-dialog";
import DeleteDialog from "../general/delete-dialog";
import TagDeleteForm from "./tag-delete-form";

interface TagActionsProps {
  tag: Tag;
}

export default function TagActions({ tag }: TagActionsProps) {
  const [edit, setEdit] = useState(false);

  const button = (
    <button type="button" className="w-6 h-6 p-0 cursor-pointer">
      <SquarePen className={tagBGs[tag.tagType].header} />
    </button>
  );

  return (
    <div className="w-full flex flex-row justify-end items-start space-x-3 mx-auto mt-1">
      <TagFormDialog
        button={button}
        id={tag.id}
        tagEdit={edit}
        setTagEdit={setEdit}
        defaultValues={{
          title: tag.title,
          description: tag.description || "",
          tagType: tag.tagType,
        }}
        title="Edit Tag"
        description="Edit tag Detail"
        submitFormText="Save Changes"
      />
      <DeleteDialog
        id={tag.id}
        title="Delete Tag"
        description="Are you sure you want to delete this tag? This action cannot be undone."
        DeleteForm={TagDeleteForm}
      />
    </div>
  );
}
