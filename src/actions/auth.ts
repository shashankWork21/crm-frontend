"use server";

import { cookies } from "next/headers";
import {
  loginPath,
  logoutPath,
  registerAdminPath,
  registerEmployeePath,
  sessionValidatePath,
} from "@/lib/paths";
import { FormState, Role } from "@/lib/types";
import axios from "axios";
import { redirect } from "next/navigation";

export async function registerUser(
  role: Role,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const countryCode = formData.get("countryCode") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const chosenPassword = formData.get("chosenPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const registerPath =
    role === Role.ADMIN ? registerAdminPath() : registerEmployeePath();

  try {
    const response = await axios.post(
      registerPath,
      {
        firstName,
        lastName,
        email,
        countryCode,
        phoneNumber,
        chosenPassword,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const cookie = response.headers["set-cookie"] as string[];
    const cookieArray = cookie[0].split(";");

    const [cookieName, cookieValue] = cookieArray[0].split("=");

    const options = {
      secure: process.env.NODE_ENV === "production",
    };

    c.set(cookieName, cookieValue, options);

    return {
      success: true,
      message: "Registration successful",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Registration failed",
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

export async function loginUser(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const c = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await axios.post(
      loginPath(),
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const cookie = response.headers["set-cookie"] as string[];
    const cookieArray = cookie[0].split(";");

    const [cookieName, cookieValue] = cookieArray[0].split("=");

    const options = {
      secure: process.env.NODE_ENV === "production",
    };

    c.set(cookieName, cookieValue, options);

    return {
      success: true,
      message: "Login successful",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Login failed",
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

export async function validateSession() {
  const c = await cookies();
  try {
    const sessionResponse = await axios.post(sessionValidatePath(), {
      sessionToken: c.get("session")?.value || "",
    });
    return sessionResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      throw new Error(data.message);
    } else {
      throw new Error("Session validation failed");
    }
  }
}

export async function logoutUser() {
  const c = await cookies();

  try {
    await axios.delete(logoutPath(), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    return {
      success: true,
      message: "Logout failed",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: "Logout failed",
        errors: data.errors,
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

export async function getSessionCookie() {
  const c = await cookies();
  return c.get("session")?.value || "";
}

export async function validateSessionToken(sessionToken: string) {
  try {
    const response = await axios.post(sessionValidatePath(), {
      sessionToken,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      throw new Error(data.message);
    } else {
      throw new Error("Session validation failed");
    }
  }
}
