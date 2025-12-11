"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { createLeadMagnet } from "@/actions/lead-magnet";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

export default function useCreateLeadMagnet() {
  const router = useRouter();
  const { user } = useAuth();

  console.log(user);

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
      itemId: "",
    }
  );

  useEffect(() => {
    if (formState?.success) {
      router.push(`/lead-magnets/${formState.itemId}`);
    }
  }, [formState?.success, router, formState?.itemId]);

  const handleDrop = (files: File[]) => {
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

  return {
    files,
    setFiles,
    formState,
    handleDrop,
    handleSubmit,
    isSubmitting,
  };
}
