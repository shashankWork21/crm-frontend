import TagsPageView from "@/components/views/tags-page";
import { getOrganisationTags } from "@/db/tags.queries";
import { Tag } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function TagsPage() {
  let tags: Tag[] = [];
  try {
    tags = await getOrganisationTags();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    redirect("/login");
  }
  return <TagsPageView tags={tags} />;
}
