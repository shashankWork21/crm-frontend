"use client";

import { Branch } from "@/lib/types";
import BranchFormDialog from "./branch-form-dialog";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import DeleteDialog from "../general/delete-dialog";
import BranchDeleteForm from "./branch-delete-form";

interface BranchActionsProps {
  branch: Branch;
}

export default function BranchActions({ branch }: BranchActionsProps) {
  const [branchEdit, setBranchEdit] = useState(false);

  const button = (
    <button type="button" className="w-6 h-6 p-0 cursor-pointer">
      <SquarePen className="text-blue-700 hover:text-blue-500" />
    </button>
  );

  return (
    <div className="flex flex-row space-x-2">
      <BranchFormDialog
        id={branch.id}
        branchEdit={branchEdit}
        setBranchEdit={setBranchEdit}
        defaultValues={{
          organisationId: branch.organisationId,
          city: branch.city,
          address: branch.address || "",
          postalCode: branch.postalCode || "",
          regionId: branch.regionId,
          type: branch.type,
          landlineNumber: branch.landlineNumber || "",
        }}
        button={button}
        title="Edit Branch"
        description="Edit the branch details (city, address, postal code, region) to keep your records up to date."
        submitFormText="Save Changes"
      />
      <DeleteDialog
        id={branch.id}
        title="Delete Branch"
        description="Are you sure you want to delete this branch? This action cannot be undone."
        DeleteForm={BranchDeleteForm}
      />
    </div>
  );
}
