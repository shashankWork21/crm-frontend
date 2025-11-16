"use server";

import {
  connectUserOrganisationPath,
  organisationPath,
  organisationPathById,
  sessionValidatePath,
} from "@/lib/paths";
import { BusinessModel } from "@/lib/types";
import { FormState } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    await axios.post(
      organisationPath(),
      {
        name,
        cityId,
        businessModel,
        legalName,
        GSTNumber,
        businessDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    return {
      success: true,
      message: "Organisation created successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Organisation creation failed",
        errors: JSON.parse(data.errors),
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
        errors: {},
      };
    }
  } finally {
    redirect("/login");
  }
}

export async function updateEmployedOrganisation(organisationId: string) {
  const c = await cookies();
  try {
    const sessionResponse = await axios.post(sessionValidatePath(), {
      sessionToken: c.get("session")?.value || "",
    });
    const { user } = sessionResponse.data;

    await axios.put(connectUserOrganisationPath(), {
      userId: user?.id,
      organisationId,
    });

    return {
      success: true,
      message: "Organisation updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to fetch organisation",
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

export async function deleteOrganisationById(organisationId: string) {
  const c = await cookies();
  try {
    await axios.delete(organisationPathById(organisationId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    revalidatePath("/dashboard/organisation");

    return {
      success: true,
      message: "Organisation deleted successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to delete organisation",
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
