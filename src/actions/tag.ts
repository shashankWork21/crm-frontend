"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { tagPath, tagPathById } from "@/lib/paths";
import { FormState, TagType } from "@/lib/types";
import { validateSession } from "./auth";

export async function createTag(
  tagType: TagType,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const { user } = await validateSession();
  const title: string = formData.get("title") as string;
  const description: string = formData.get("description") as string;

  try {
    await axios.post(
      tagPath(),
      {
        title,
        description,
        tagType,
        createdOrganisationId: user?.organisationId as string,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    revalidatePath(`/dashboard/tags`);
    revalidatePath(`/dashboard/contacts`);
    revalidatePath(`/dashboard/contacts/organisations`);
    revalidatePath(`/dashboard/contacts/activities`);

    return {
      success: true,
      message: "Tag created successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Login failed",
        errors: JSON.parse(data.errors),
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
        errors: {},
      };
    }
  }
}

export async function updateTag(
  tagId: string,
  tagType: TagType,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const { user } = await validateSession();
  const title: string = formData.get("title") as string;
  const description: string = formData.get("description") as string;

  try {
    await axios.patch(
      tagPathById(tagId),
      {
        title,
        description,
        tagType,
        createdOrganisationId: user?.organisationId as string,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    revalidatePath(`/dashboard/tags`);
    revalidatePath(`/dashboard/contacts`);
    revalidatePath(`/dashboard/contacts/organisations`);
    revalidatePath(`/dashboard/contacts/activities`);

    return {
      success: true,
      message: "Tag created successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Login failed",
        errors: JSON.parse(data.errors),
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
        errors: {},
      };
    }
  }
}

export async function deleteTag(tagId: string) {
  const c = await cookies();

  try {
    await axios.delete(tagPathById(tagId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    revalidatePath(`/dashboard/tags`);
    revalidatePath(`/dashboard/contacts`);
    revalidatePath(`/dashboard/contacts/organisations`);
    revalidatePath(`/dashboard/contacts/activities`);

    return {
      success: true,
      message: "Tag deleted successfully",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      errors:
        error instanceof Error
          ? { _form: error.message }
          : { _form: "An unexpected error occurred" },
    };
  }
}
