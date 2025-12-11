"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { statePath } from "@/lib/paths";

export async function createState(name: string, countryId: string) {
  const c = await cookies();
  try {
    const result = await axios.post(
      statePath(),
      { name, countryId },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    return {
      success: true,
      message: "State created successfully",
      errors: {},
      state: result.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "State creation failed",
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
