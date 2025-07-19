"use server";

import { ActivityType, FormState } from "@/lib/types";
import { cookies } from "next/headers";
import { validateSession } from "./auth";
import { activityPath, activityPathById } from "@/lib/paths";
import axios from "axios";
import { revalidatePath } from "next/cache";

export interface CreateActivityData {
  contactId: string;
  needFollowUp: boolean;
  assignedToId?: string;
  followUpDate?: Date;
  followUpActivityId?: string;
  type: ActivityType;
}

export interface UpdateActivityData extends CreateActivityData {
  id: string;
}

export async function createActivity(
  data: CreateActivityData,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const { user } = await validateSession();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await axios.post(
      activityPath(),
      {
        ...data,
        title,
        description,
        addedById: user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard/contacts");
    revalidatePath(`/dashboard/contacts/organisation`);
    return {
      success: true,
      message: "Activity created successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to delete contact",
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

export async function updateActivity(
  data: UpdateActivityData,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const { user } = await validateSession();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await axios.put(
      activityPathById(data.id),
      {
        ...data,
        title,
        description,
        addedById: user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard/contacts");
    revalidatePath(`/dashboard/contacts/organisation`);
    return {
      success: true,
      message: "Activity updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to delete contact",
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

export async function deleteActivity(id: string) {
  const c = await cookies();

  try {
    await axios.delete(activityPathById(id), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    revalidatePath("/dashboard/contacts");
    revalidatePath(`/dashboard/contacts/organisation`);
    return {
      success: true,
      message: "Activity deleted successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to delete activity",
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
