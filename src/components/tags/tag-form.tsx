"use client";

import { useState, useEffect, useActionState, startTransition } from "react";

import { createTag, updateTag } from "@/actions/tag";
import { TagType } from "@/lib/types";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";

export interface TagFormProps {
  id: string | null;
  defaultValues: {
    title: string;
    description: string;
    tagType: TagType;
  };
  setEdit: (edit: boolean) => void;
  submitFormText: string;
}

export default function TagForm({
  id,
  defaultValues,
  setEdit,
  submitFormText,
}: TagFormProps) {
  const [tagType, setTagType] = useState<TagType>(
    defaultValues.tagType || TagType.CONTACT
  );

  const formSubmitAction = !!id
    ? updateTag.bind(null, id as string, tagType)
    : createTag.bind(null, tagType);

  const [formState, action] = useActionState(formSubmitAction, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setEdit(false);
    }
  }, [formState.success, setEdit]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 py-2">
        <div className="flex flex-col space-y-2">
          <Input
            name="title"
            type="text"
            placeholder="Tag Title"
            defaultValue={defaultValues.title}
            className="bg-white"
          />
          {!!formState.errors.title && (
            <ul>
              {formState.errors.title.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="description"
            type="text"
            placeholder="Tag Description"
            defaultValue={defaultValues.description}
            className="bg-white"
          />
          {!!formState.errors.description && (
            <ul>
              {formState.errors.description.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row space-x-2 items-center w-full">
            <label className="text-md font-medium text-slate-700 basis-1/5">
              Tag Type
            </label>
            <Select
              value={tagType}
              onValueChange={(value) => setTagType(value as TagType)}
            >
              <SelectTrigger className="bg-white cursor-pointer basis-4/5">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white cursor-pointer basis-4/5">
                {Object.values(TagType).map((type, index) => (
                  <SelectItem
                    key={index}
                    value={type}
                    className="cursor-pointer hover:bg-slate-100"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!!formState.errors.tagType && (
            <ul>
              {formState.errors.tagType.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          {submitFormText}
        </Button>
      </form>
      {formState.success && (
        <div className="mt-4 text-green-600">
          {formState.message || "Region created successfully!"}
        </div>
      )}
    </>
  );
}
