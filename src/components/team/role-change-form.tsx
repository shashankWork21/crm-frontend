"use client";

import { changeUserRole } from "@/actions/user";
import { Role, User } from "@/lib/types";
import { useActionState, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface RoleChangeFormProps {
  user: User;
  setEdit(edit: boolean): void;
}

export default function RoleChangeForm({ user, setEdit }: RoleChangeFormProps) {
  const [role, setRole] = useState(`${user.role}`);

  const [formState, action] = useActionState(
    changeUserRole.bind(null, user.id, role),
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

  return (
    <form action={action} className="flex flex-col space-y-4 py-2">
      <Select
        defaultValue={user.role}
        onValueChange={(role) => setRole(role)}
        value={`${role}`}
      >
        <SelectTrigger className="w-full bg-white cursor-pointer">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {Object.values(Role).map((role: string, index: number) => (
            <SelectItem
              key={index}
              value={role}
              className="cursor-pointer hover:bg-slate-100"
            >
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="w-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
      >
        Update
      </Button>
      {formState.success && formState.message && (
        <p
          className={`w-full text-center text-sm ${
            formState.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {formState.message}
        </p>
      )}
      {formState.errors._form && (
        <p
          className={`w-full text-center text-sm ${
            formState.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {formState.errors._form[0]}
        </p>
      )}
    </form>
  );
}
