"use server";

import { cookies } from "next/headers";
import {
  loginPath,
  logoutPath,
  registerAdminPath,
  registerEmployeePath,
  sessionValidatePath,
} from "@/lib/paths";
import { FormState, Role, Session, User } from "@/lib/types";
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

export async function validateSession(): Promise<{
  user: User;
  session: Session;
}> {
  const c = await cookies();

  try {
    const sessionResponse = await axios.post(sessionValidatePath(), {
      sessionToken: c.get("session")?.value || "",
    });

    console.log(sessionResponse);

    if (sessionResponse.status !== 200) {
      throw new Error("Session validation failed");
    }

    return sessionResponse.data;
  } catch (error) {
    console.error("Session validation error:", error);
    redirect("/login");
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
  } catch (error) {
    console.log("Logout error:", error);
    redirect("/login");
  }

  redirect("/login");
}

export async function getSessionCookie() {
  const c = await cookies();
  return c.get("session")?.value || "";
}

export async function validateSessionToken(sessionToken: string) {
  const response = await axios.post(sessionValidatePath(), {
    sessionToken,
  });
  if (response.status !== 200) {
    redirect("/login");
  }
  return response.data;
}
