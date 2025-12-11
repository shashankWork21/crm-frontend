"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { cityPath } from "@/lib/paths";

export async function createCity(name: string, stateId: string) {
  const c = await cookies();
  try {
    const result = await axios.post(
      cityPath(),
      { name, stateId },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    return {
      success: true,
      message: "City created successfully",
      errors: {},
      city: result.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "City creation failed",
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
