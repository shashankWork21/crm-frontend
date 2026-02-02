"use server";

import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import {
  forgotPasswordPath,
  loginPath,
  logoutPath,
  registerPath,
  sessionValidatePath,
  resetPasswordPath,
} from "@/lib/paths";
import { FormState, Role, Session, User } from "@/lib/types";
import { redirect } from "next/navigation";

export async function registerUser(
  role: Role,
  formState: FormState,
  formData: FormData,
) {
  const c = await cookies();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const countryCode = formData.get("countryCode") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const chosenPassword = formData.get("chosenPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const roles = {
    [Role.SUPER_ADMIN]: "super_admin",
    [Role.PLATFORM_ADMIN]: "platform_admin",
    [Role.ORGANISATION_ADMIN]: "organisation_admin",
    [Role.EMPLOYEE]: "employee",
  };

  const registerUrl = registerPath(roles[role]);

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        countryCode,
        phoneNumber,
        chosenPassword,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log("Fetch error response:", data);
      return {
        success: false,
        message: "Registration failed",
        errors: JSON.parse(data.errors),
      };
    }

    const cookie = response.headers.get("set-cookie");
    if (cookie) {
      const cookieArray = cookie.split(";");
      const [cookieName, cookieValue] = cookieArray[0].split("=");

      const options = {
        secure: process.env.NODE_ENV === "production",
      };

      c.set(cookieName, cookieValue, options);
    }

    return {
      success: true,
      message: "Registration successful",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function loginUser(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const c = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(loginPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log("Fetch error response:", data);
      return {
        success: false,
        message: "Login failed",
        errors: JSON.parse(data).errors,
      };
    }

    const cookie = response.headers.get("set-cookie");
    if (cookie) {
      const cookieArray = cookie.split(";");
      const [cookieName, cookieValue] = cookieArray[0].split("=");

      const options = {
        secure: process.env.NODE_ENV === "production",
      };

      c.set(cookieName, cookieValue, options);
    }

    return {
      success: true,
      message: "Login successful",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {
        _form: ["An unexpected error occurred."],
      },
    };
  }
}

async function performSessionValidation(
  sessionToken: string,
): Promise<{ user: User | null; session: Session }> {
  try {
    const response = await fetch(sessionValidatePath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken }),
    });

    if (!response.ok) {
      return {
        user: null,
        session: {} as Session,
      };
    }

    return response.json();
  } catch (error) {
    console.error("Session validation error:", error);
    return {
      user: null,
      session: {} as Session,
    };
  }
}

export async function validateSession(): Promise<{
  user: User | null;
  session: Session;
}> {
  const c = await cookies();
  const sessionToken = c.get("session")?.value || "";
  return performSessionValidation(sessionToken);
}

const cachedValidation = unstable_cache(
  performSessionValidation,
  ["session-validation"],
  {
    revalidate: 14400, // 4 hours in seconds
    tags: ["session"],
  },
);

export const validateSessionCached = async (): Promise<{
  user: User | null;
  session: Session;
}> => {
  const c = await cookies();
  const sessionToken = c.get("session")?.value || "";
  return cachedValidation(sessionToken);
};

export async function logoutUser() {
  const c = await cookies();

  try {
    await fetch(logoutPath(), {
      method: "DELETE",
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
  const response = await fetch(sessionValidatePath(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionToken }),
  });

  if (!response.ok) {
    redirect("/login");
  }
  return response.json();
}

export async function forgotPassword(formState: FormState, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const response = await fetch(forgotPasswordPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "Login failed",
        errors: JSON.parse(data.errors),
      };
    }

    return {
      success: true,
      message: "Password reset link sent to your email",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}

export async function resetPassword(
  userId: string,
  formState: FormState,
  formData: FormData,
) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    const response = await fetch(resetPasswordPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "Password reset failed",
        errors: JSON.parse(data.errors),
      };
    }

    return {
      success: true,
      message: "Password reset successful",
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
