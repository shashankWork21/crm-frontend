import { createEmployedOrganisation } from "@/actions/organisation";
import OrganisationCreateForm from "@/components/organisation/organisation-create-form";

export default async function CreateOrganisationPage() {
  return (
    <div>
      <OrganisationCreateForm
        createOrganisationAction={createEmployedOrganisation}
      />
    </div>
  );
}
