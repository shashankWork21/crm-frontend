"use server";

import { contactCreatePath, contactPathById } from "@/lib/paths";
import { Contact, FormState, Gender } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export async function createContact(
  contactOrgId: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const gender = formData.get("gender") as Gender;

  try {
    await axios.post(
      contactCreatePath(),
      {
        name,
        email,
        phoneNumber,
        gender,
        contactOrgId,
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Contact creation failed",
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
  data: Partial<Contact>,
  field: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const contactId = data.id;
  if (!contactId) {
    return {
      success: false,
      message: "Contact ID is required for update",
      errors: {},
    };
  }
  const value = formData.get(field) || data[field as keyof Contact];

  try {
    await axios.put(
      contactPathById(contactId),
      {
        [field]: value,
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
      message: "Contact updated successfully",
      errors: {},
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Contact update failed",
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
