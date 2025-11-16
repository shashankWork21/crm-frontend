"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { countryPath } from "@/lib/paths";

export async function createCountry(name: string) {
  const c = await cookies();
  try {
    const result = await axios.post(
      countryPath(),
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    return {
      success: true,
      message: "Country created successfully",
      errors: {},
      country: result.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Country creation failed",
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
