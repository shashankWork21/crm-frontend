"use client";

import { startTransition, useActionState, useState } from "react";
import { createLeadMagnet } from "@/actions/lead-magnet";
import { useAuth } from "@/context/auth.context";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

export default function CreateaLeadMagnetForm() {
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [formState, action] = useActionState(
    createLeadMagnet.bind(null, {
      organisationId: user?.organisationId || "",
      createdById: user?.id || "",
      files,
    }),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-oxford-blue block"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          className="w-full border-powder-blue/30 focus:border-oxford-blue focus:ring-oxford-blue/20"
          placeholder="Enter lead magnet title"
        />
        {formState.errors.title && (
          <p className="text-sm text-red-600 mt-1">{formState.errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-oxford-blue block"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          className="w-full border-powder-blue/30 focus:border-oxford-blue focus:ring-oxford-blue/20 resize-none"
          placeholder="Describe your lead magnet and its value proposition"
        />
        {formState.errors.description && (
          <p className="text-sm text-red-600 mt-1">
            {formState.errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="fileUrl"
          className="text-sm font-semibold text-oxford-blue block"
        >
          URL
        </label>
        <Input
          id="fileUrl"
          name="fileUrl"
          type="url"
          className="w-full border-powder-blue/30 focus:border-oxford-blue focus:ring-oxford-blue/20"
          placeholder="https://example.com/your-lead-magnet.pdf"
        />
        {formState.errors.fileUrl && (
          <p className="text-sm text-red-600 mt-1">
            {formState.errors.fileUrl}
          </p>
        )}
      </div>

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-powder-blue/30" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-rich-black font-medium">OR</span>
        </div>
      </div>

      <div className="space-y-2">
        <Dropzone
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={10}
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>

      {formState.message && (
        <div
          className={`p-4 rounded-lg ${
            formState.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {formState.message}
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sunglow hover:bg-sunglow/90 text-rich-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Lead Magnet"}
        </Button>
      </div>
    </form>
  );
}
