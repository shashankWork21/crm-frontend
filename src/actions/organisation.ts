"use server";

import {
  connectUserOrganisationPath,
  organisationPath,
  organisationPathById,
  sessionValidatePath,
} from "@/lib/paths";
import { BusinessModel } from "@/lib/types";
import { FormState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createEmployedOrganisation(
  cityId: string,
  businessModel: BusinessModel,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const name = formData.get("name") as string;
  const legalName = (formData.get("legalName") as string) || "";
  const GSTNumber = (formData.get("gstNumber") as string) || "";
  const businessDescription =
    (formData.get("businessDescription") as string) || "";

  try {
    const response = await fetch(organisationPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        name,
        cityId,
        businessModel,
        legalName,
        GSTNumber,
        businessDescription,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "Organisation creation failed",
        errors: JSON.parse(data.errors),
      };
    }

    return {
      success: true,
      message: "Organisation created successfully",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function updateEmployedOrganisation(organisationId: string) {
  const c = await cookies();
  try {
    const sessionResponse = await fetch(sessionValidatePath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: c.get("session")?.value || "",
      }),
    });

    if (!sessionResponse.ok) {
      return {
        success: false,
        message: "Failed to validate session",
        errors: {},
      };
    }

    const sessionData = await sessionResponse.json();
    const { user } = sessionData;

    const updateResponse = await fetch(connectUserOrganisationPath(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        organisationId,
      }),
    });

    if (!updateResponse.ok) {
      const data = await updateResponse.json();
      return {
        success: false,
        message: "Failed to fetch organisation",
        errors: JSON.parse(data.errors),
      };
    }

    return {
      success: true,
      message: "Organisation updated successfully",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function deleteOrganisationById(organisationId: string) {
  const c = await cookies();
  try {
    const response = await fetch(organisationPathById(organisationId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "Failed to delete organisation",
        errors: JSON.parse(data.errors),
      };
    }

    revalidatePath("/dashboard/organisation");

    return {
      success: true,
      message: "Organisation deleted successfully",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
