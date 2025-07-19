"use server";

import {
  branchPath,
  connectUserOrganisationPath,
  orgaisationPath,
  orgaisationPathById,
  regionPath,
  regionPathById,
  sessionValidatePath,
} from "@/lib/paths";
import { BranchType, FormState } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createEmployedOrganisation(
  regionId: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const name = formData.get("name") as string;
  const regionName = formData.get("regionName") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string | null;
  const address = formData.get("address") as string | null;
  const landlineNumber = formData.get("landlineNumber") as string | null;
  const type = BranchType.HEADQUARTERS;

  let organisationId: string = "";
  let createdRegionId: string = regionId || "";

  try {
    const organisation = await axios.post(
      orgaisationPath(),
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    organisationId = organisation.data.id;

    let region;
    // If there's no regionId provided, create a new region
    if (!regionId) {
      region = await axios.post(
        regionPath(),
        {
          name: regionName,
          country,
          state,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );
      createdRegionId = region.data.id;
    }

    await axios.post(
      branchPath(),
      {
        address,
        city,
        postalCode,
        landlineNumber,
        regionId: createdRegionId,
        organisationId: organisation.data.id,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    revalidatePath("/dashboard/organisation");

    return {
      success: true,
      message: "Organisation created successfully",
      errors: {},
    };
  } catch (error) {
    if (organisationId) {
      await axios.delete(orgaisationPathById(organisationId), {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      });
    }

    if (createdRegionId) {
      await axios.delete(regionPathById(createdRegionId), {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      });
    }

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
      userId: user.id,
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
    await axios.delete(orgaisationPathById(organisationId), {
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
