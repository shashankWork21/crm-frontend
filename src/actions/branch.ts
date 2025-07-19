"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { BranchType, FormState } from "@/lib/types";
import { branchPath, branchPathById } from "@/lib/paths";

export async function createBranch(
  data: { organisationId: string; regionId: string; branchType: BranchType },
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const city = formData.get("city") as string;
  const address = formData.get("address") as string;
  const postalCode = formData.get("postalCode") as string;

  const { regionId, branchType, organisationId } = data;

  try {
    await axios.post(
      branchPath(),
      {
        city,
        address,
        postalCode,
        type: branchType,
        regionId,
        organisationId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath(`/dashboard/organisation`);
    revalidatePath(`/dashboard/contact/organisations`);
    return {
      success: true,
      message: "Branch created successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Branch creation failed",
        errors: JSON.parse(data.errors),
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function updateBranch(
  data: {
    id: string;
    organisationId: string;
    regionId: string;
    branchType: BranchType;
  },
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const city = formData.get("city") as string;
  const address = formData.get("address") as string;
  const postalCode = formData.get("postalCode") as string;

  const { regionId, branchType, organisationId } = data;

  try {
    await axios.put(
      branchPathById(data.id),
      {
        city,
        address,
        postalCode,
        type: branchType,
        regionId,
        organisationId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath(`/dashboard/organisation`);
    revalidatePath(`/dashboard/contact/organisations`);
    return {
      success: true,
      message: "Branch updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Branch creation failed",
        errors: JSON.parse(data.errors),
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function deleteBranch(id: string) {
  const c = await cookies();

  try {
    await axios.delete(branchPathById(id), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    revalidatePath(`/dashboard/organisation`);
    revalidatePath(`/dashboard/contacts/organisations`);

    return {
      success: true,
      message: "Branch deleted successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: data.message || "Failed to delete branch",
        errors: JSON.parse(data.errors),
      };
    }

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
