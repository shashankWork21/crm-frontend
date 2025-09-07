"use client";

import { User } from "@/lib/types";
import RoleChangeDialog from "./role-change-dialog";
import DeleteDialog from "../general/delete-dialog";
import DeleteUserForm from "./delete-user-form";

interface TeamActionsProps {
  user: User;
  admin: User;
}

export default function TeamActions({ user, admin }: TeamActionsProps) {
  const userActions = (
    <div className="flex flex-row items-center justify-center space-x-2">
      <RoleChangeDialog user={user} />
      <DeleteDialog
        id={user?.id}
        title={`Delete user ${user?.firstName} ${user?.lastName}?`}
        description='Warning! This action cannot be undone. Click on the button "Delete User only if you are sure you want to delete this user?.'
        DeleteForm={DeleteUserForm}
      />
    </div>
  );

  return user?.id !== admin?.id ? (
    userActions
  ) : (
    <p className="text-sm text-slate-400">No Actions</p>
  );
}
