"use client";

import { BranchType, Contact, Organisation, User } from "@/lib/types";
import ProtectedRoute from "../auth/protected-route";
import BranchCard from "../branch/branch-card";
import BranchFormDialog from "../branch/branch-form-dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import ContactCardView from "../contacts/contact-card-view";

interface OrganisationPageProps {
  organisation: Organisation;
  contacts?: Contact[];
  team?: User[];
}
export default function OrganisationPageView({
  organisation,
  contacts,
  team,
}: OrganisationPageProps) {
  const [createBranch, setCreateBranch] = useState(false);
  const button = (
    <button className="bg-slate-800 text-white pl-2 pr-4 py-2 rounded cursor-pointer hover:bg-slate-300 hover:text-black transition-colors shadow-md duration-300 flex flex-row items-center justify-center">
      <Plus className="mr-2" />
      Add Branch
    </button>
  );
  return (
    <ProtectedRoute>
      <div className="w-4/5 mx-auto h-screen flex flex-col space-y-10">
        <h1 className="text-2xl font-bold">{organisation.name}</h1>
        <div className="flex flex-row items-center justify-start space-x-8">
          <h3 className="text-xl font-semibold text-slate-700">Branches:</h3>
          <BranchFormDialog
            id={null}
            branchEdit={createBranch}
            setBranchEdit={setCreateBranch}
            defaultValues={{
              organisationId: organisation.id,
              city: "",
              address: "",
              postalCode: "",
              regionId: "",
              type: BranchType.BRANCH,
              landlineNumber: "",
            }}
            button={button}
            title="Create new Branch"
            description="Create a new branch for this organisation."
            submitFormText="Create Branch"
          />
        </div>
        <div className="flex flex-row items-center justify-start space-x-4 flex-wrap">
          {organisation.branches?.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
        {contacts && team && (
          <ContactCardView contacts={contacts} team={team} />
        )}
      </div>
    </ProtectedRoute>
  );
}
