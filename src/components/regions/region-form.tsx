"use client";

import { createRegion, updateRegion } from "@/actions/region";
import { startTransition, useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RegionFormProps {
  id: string | null;
  defaultValues: {
    name: string;
    state: string;
    country: string;
  };
  setEdit: (edit: boolean) => void;
  submitFormText: string;
}

export default function RegionForm({
  id,
  defaultValues,
  setEdit,
  submitFormText,
}: RegionFormProps) {
  const formSubmitAction = !!id
    ? updateRegion.bind(null, id as string)
    : createRegion;
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
            defaultValue={defaultValues.name}
            name="name"
            type="text"
            placeholder="Region Name"
            className="bg-slate-50"
          />
          {!!formState.errors.regionName && (
            <ul>
              {formState.errors.regionName.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-600">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            defaultValue={defaultValues.state}
            name="state"
            type="text"
            placeholder="State"
            className="bg-slate-50"
          />
          {!!formState.errors.state && (
            <ul>
              {formState.errors.state.map((error: string, index: number) => (
                <li key={index} className="text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            defaultValue={defaultValues.country}
            name="country"
            type="text"
            placeholder="Country"
            className="bg-slate-50"
          />
          {!!formState.errors.country && (
            <ul>
              {formState.errors.country.map((error: string, index: number) => (
                <li key={index} className="text-red-600">
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
