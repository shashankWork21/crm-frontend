import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ContactsByOrganisationPage() {
  try {
    return <div>Organisation Page view</div>;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching organisation:", error.message);
    }
    redirect("/login");
  }
}
