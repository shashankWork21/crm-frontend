"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { DeleteFormProps } from "@/lib/types";
import { deleteTag } from "@/actions/tag";

export default function TagDeleteForm({ setOpen, id }: DeleteFormProps) {
  const [formState, action] = useActionState(deleteTag.bind(null, id), {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <div className="flex flex-col space-y-3 p-4">
      <form action={action}>
        <Button
          type="submit"
          variant="destructive"
          className="w-full bg-red-700 hover:bg-red-800 cursor-pointer"
        >
          Delete Tag
        </Button>
      </form>
      {formState.success && (
        <span className="text-green-600">{formState.message}</span>
      )}
      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <span className="text-red-600">
          {Object.values(formState.errors).join(", ")}
        </span>
      )}
    </div>
  );
}
