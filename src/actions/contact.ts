"use server";
import axios from "axios";
import { cookies } from "next/headers";
import xlsx from "node-xlsx";
import {
  bulkCreateBranchesPath,
  bulkCreateContactsPath,
  bulkCreateNotesPath,
  bulkCreateOrganisationsPath,
  bulkCreateRegionsPath,
  contactCreatePath,
  contactPathById,
  orgaisationPathById,
  regionPath,
  regionPathById,
  branchPath,
  branchPathById,
  branchPathDeleteByIdForce,
  createContactOrganisationPath,
} from "@/lib/paths";
import {
  Branch,
  BranchType,
  Contact,
  ContactType,
  FormState,
  NoteCategory,
  Organisation,
  Region,
} from "@/lib/types";
import { validateSession } from "./auth";
import { revalidatePath } from "next/cache";

interface ContactCreateData {
  branchId: string | null;
  regionId: string | null;
  organisationId: string | null;
}

export async function createContact(
  data: ContactCreateData,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const { user } = await validateSession();
  const name = formData.get("name") as string;

  const email = formData.get("email") as string;
  const countryCode = formData.get("countryCode") as string;
  const number = formData.get("number") as string;
  const alternateNumber = formData.get("alternateNumber") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const address = formData.get("address") as string;
  const orgName = formData.get("orgName") as string;
  const regionName = formData.get("regionName") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;

  const { branchId, regionId, organisationId } = data;

  // Keep track of resources created in this function call only
  const createdResources = {
    regionId: null,
    organisationId: null,
    branchId: null,
  };

  try {
    if (!regionId) {
      const region = await axios.post(
        regionPath(),
        {
          name: regionName,
          state,
          country,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );
      createdResources.regionId = region.data.id;
    }
    if (!organisationId) {
      const organisation = await axios.post(
        createContactOrganisationPath(),
        {
          name: orgName,
          contactOrgId: user.organisationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );
      createdResources.organisationId = organisation.data.id;
    }
    if (!branchId) {
      const branch = await axios.post(
        branchPath(),
        {
          address,
          city,
          postalCode,
          type: BranchType.HEADQUARTERS,
          landlineNumber: "",
          regionId: createdResources.regionId || regionId,
          organisationId: createdResources.organisationId || organisationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );
      createdResources.branchId = branch.data.id;
    }
    await axios.post(
      contactCreatePath(),
      {
        name,
        email,
        phoneNumber: `${countryCode}${number}`,
        alternateNumber,
        contactType: ContactType.LEAD,
        contactOrgId: user.organisationId,
        branchId: createdResources.branchId || branchId,
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
      message: "Contact created successfully",
      errors: {},
    };
  } catch (error) {
    console.error("Error in contact creation:", error);

    // Only clean up resources created in THIS function call
    try {
      // Delete in reverse order to prevent foreign key constraints
      if (createdResources.branchId) {
        await axios.delete(
          branchPathDeleteByIdForce(createdResources.branchId),
          {
            headers: {
              "Content-Type": "application/json",
              Cookie: `session=${c.get("session")?.value || ""}`,
            },
          }
        );
      }

      if (createdResources.organisationId) {
        await axios.delete(
          orgaisationPathById(createdResources.organisationId),
          {
            headers: {
              "Content-Type": "application/json",
              Cookie: `session=${c.get("session")?.value || ""}`,
            },
          }
        );
      }

      if (createdResources.regionId) {
        await axios.delete(regionPathById(createdResources.regionId), {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        });
      }
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
      // Don't throw another error during cleanup
    }

    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Contact creation failed",
        errors: data.errors
          ? JSON.parse(data.errors)
          : { general: "API error" },
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

export async function bulkCreateContacts(
  formState: FormState,
  formData: FormData
) {
  // Track created resources with empty arrays initially
  const createdResources = {
    regions: [] as Region[],
    organisations: [] as Organisation[],
    branches: [] as Branch[],
    contacts: [] as Contact[],
  };

  try {
    const c = await cookies();
    const { user } = await validateSession();

    const contactsFile = formData.get("contactsFile");
    const fileBuffer = await (contactsFile as Blob).arrayBuffer();
    const parsedData = xlsx.parse(fileBuffer);

    const data =
      parsedData.find((sheet) => sheet.name === "Sheet1")?.data || [];
    const filteredData = data.filter(
      (row) => row[0] && row[1] && row[2] && row[3] && row[4] && row[5]
    );

    console.log(filteredData.length);
    const regionData = filteredData.slice(1).map((row) => ({
      name: row[3].trim(),
      state: row[2].trim(),
      country: "India",
    }));
    const organisationData = filteredData.slice(1).map((row) => ({
      name: row[0].trim(),
      contactOrgId: user.organisationId,
    }));

    const regionsResponse = await axios.post(
      bulkCreateRegionsPath(),
      regionData,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    createdResources.regions = regionsResponse.data.regions;

    const organisationsResponse = await axios.post(
      bulkCreateOrganisationsPath(),
      organisationData,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    createdResources.organisations =
      organisationsResponse.data as Organisation[];

    const branchData = filteredData.slice(1).map((row, index) => ({
      address: row[7] || "",
      city: row[4].trim(),
      postalCode: `${row[6]}` || "",
      type: BranchType.HEADQUARTERS,
      landlineNumber: `${row[9]}` || "",
      regionId: createdResources.regions[index].id,
      organisationId: createdResources.organisations[index]?.id || "",
    }));

    const branchesResponse = await axios.post(
      bulkCreateBranchesPath(),
      branchData,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    createdResources.branches = branchesResponse.data as Branch[];

    const contactsData = filteredData.slice(1).map((row, index) => ({
      name: row[1] as string,
      phoneNumber: `${row[5]}`.trim(),
      contactType: ContactType.LEAD,
      email: row[10] || "",
      alternateNumber: `${row[8]}`.trim() || "",
      contactOrgId: user.organisationId,
      branchId: createdResources.branches[index]?.id,
    }));

    const contactsResponse = await axios.post(
      bulkCreateContactsPath(),
      contactsData,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    createdResources.contacts = contactsResponse.data as Contact[];

    const notesData = filteredData
      .slice(1)
      .map((row, index) => ({
        contactId: createdResources.contacts[index]?.id,
        title: "From Excel Import",
        description: row[11] || "",
        createdById: user.id,
        category: NoteCategory.MISCELLANEOUS,
      }))
      .filter((note) => note.description && note.description.trim() !== "");

    await axios.post(bulkCreateNotesPath(), notesData, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    console.log("Contacts created:", createdResources.contacts.length);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contacts");
    revalidatePath("/dashboard/contacts/organisation");

    return {
      success: true,
      message: "Bulk contact creation successful",
      errors: {},
    };
  } catch (error) {
    console.log("Error in bulk contact creation:", error);

    // Cleanup in reverse order to respect foreign key constraints
    try {
      // 1. Delete contacts first
      if (createdResources.contacts.length > 0) {
        for (const contact of createdResources.contacts) {
          try {
            await axios.delete(contactPathById(contact.id), {
              headers: {
                "Content-Type": "application/json",
                Cookie: `session=${
                  (await cookies()).get("session")?.value || ""
                }`,
              },
            });
          } catch (deleteError) {
            console.error(
              `Failed to delete contact ${contact.id}:`,
              deleteError
            );
          }
        }
      }

      // 2. Delete branches next
      if (createdResources.branches.length > 0) {
        for (const branch of createdResources.branches) {
          try {
            await axios.delete(branchPathById(branch.id), {
              headers: {
                "Content-Type": "application/json",
                Cookie: `session=${
                  (await cookies()).get("session")?.value || ""
                }`,
              },
            });
          } catch (deleteError) {
            console.error(`Failed to delete branch ${branch.id}:`, deleteError);
          }
        }
      }

      // 3. Delete organisations
      if (createdResources.organisations.length > 0) {
        for (const organisation of createdResources.organisations) {
          try {
            await axios.delete(orgaisationPathById(organisation.id), {
              headers: {
                "Content-Type": "application/json",
                Cookie: `session=${
                  (await cookies()).get("session")?.value || ""
                }`,
              },
            });
          } catch (deleteError) {
            console.error(
              `Failed to delete organisation ${organisation.id}:`,
              deleteError
            );
          }
        }
      }


    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Bulk contact creation failed",
        errors: data.errors
          ? JSON.parse(data.errors)
          : { general: "API error" },
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

export async function deleteContactById(contactId: string) {
  const c = await cookies();
  try {
    await axios.delete(contactPathById(contactId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contacts");
    revalidatePath("/dashboard/contacts/organisation");
    return {
      success: true,
      message: "Contact deleted successfully",
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

export async function updateContact(
  id: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const alternateNumber = formData.get("alternateNumber");

  try {
    await axios.put(
      contactPathById(id),
      {
        name,
        email,
        phoneNumber,
        alternateNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contacts");
    revalidatePath("/dashboard/contacts/organisation");

    return {
      success: true,
      message: "Contact updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to update contact",
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

export async function updateContactFollowup(
  contactId: string,
  userId: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const followUpFrequency = parseInt(
    formData.get("followUpFrequency") as string
  );
  const now = new Date();
  const followUpOn = new Date(
    now.getTime() + followUpFrequency * 24 * 60 * 60 * 1000
  );

  try {
    await axios.put(
      contactPathById(contactId),
      {
        followUpFrequency,
        followUpOn,
        assignedToId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contacts");
    revalidatePath("/dashboard/contacts/organisation");

    return {
      success: true,
      message: "Contact updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to update contact",
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

export async function cascadeFollowup(
  contactId: string,
  followUpFrequency: number = 0
) {
  const c = await cookies();

  const now = new Date();
  const followUpOn = new Date(
    now.getTime() + followUpFrequency * 24 * 60 * 60 * 1000
  );

  try {
    await axios.put(
      contactPathById(contactId),
      {
        followUpOn,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contacts");
    revalidatePath("/dashboard/contacts/organisation");

    return {
      success: true,
      message: "Contact updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Failed to update contact",
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
