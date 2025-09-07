"use client";

import { modifyProfile } from "@/actions/user";
import { User } from "@/lib/types";
import { useEffect, useActionState, startTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProfileEditFormProps {
  user: User;
  setEdit: (edit: boolean) => void;
}

export default function ProfileEditForm({
  user,
  setEdit,
}: ProfileEditFormProps) {
  const [formState, action] = useActionState(
    modifyProfile.bind(null, user?.id),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

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
            name="firstName"
            type="text"
            placeholder="Tag Title"
            defaultValue={user?.firstName}
            className="bg-white"
          />
          {!!formState.errors.firstName && (
            <ul>
              {formState.errors.firstName.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="lastName"
            type="text"
            placeholder="Tag Title"
            defaultValue={user?.lastName}
            className="bg-white"
          />
          {!!formState.errors.lastName && (
            <ul>
              {formState.errors.lastName.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-full flex flex-row items-center justify-start space-x-2">
            <Input
              name="countryCode"
              type="text"
              placeholder="+XXX"
              className="basis-1/4 bg-white"
              defaultValue={user?.countryCode}
            />
            <Input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="basis-3/4 bg-white"
              defaultValue={user?.phoneNumber}
            />
          </div>
          {!!formState.errors.countryCode && (
            <ul>
              {formState.errors.countryCode.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-600">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
          {!!formState.errors.phoneNumber && (
            <ul>
              {formState.errors.phoneNumber.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-600">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Save Changes
        </Button>
      </form>
      {formState.success && (
        <div className="mt-4 text-green-600">
          {formState.message || "Profile edited successfully"}
        </div>
      )}
    </>
  );
}
