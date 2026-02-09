"use server";

import { cookies } from "next/headers";

import { tokenByIdPath, tokenPath } from "@/lib/paths";
import { Token } from "@/lib/types";
import { validateSessionCached } from "./auth";
import { getTokenByUserId } from "@/db/token.queries";

export async function createInstagramToken(
  data: Partial<Token> & {
    instagramId?: string;
    appScopedInstagramId?: string;
  },
) {
  const c = await cookies();
  try {
    const response = await fetch(tokenPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create Instagram token");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating Instagram token:", error);
    throw error;
  }
}

export async function updateInstagramToken(
  tokenId: string,
  data: Partial<Token> & {
    instagramId?: string;
    appScopedInstagramId?: string;
  },
) {
  const c = await cookies();
  try {
    const response = await fetch(tokenByIdPath(tokenId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update Instagram token");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating Instagram token:", error);
    throw error;
  }
}

export async function refreshInstagramToken(token: Token) {
  const accessToken = token?.accessToken;

  if (!accessToken) {
    return false;
  }

  const timeTillExpiry =
    new Date(token.expiresAt as string).getTime() - Date.now();

  if (timeTillExpiry > 2 * 24 * 60 * 60 * 1000) {
    console.log("Token not close to expiry, no refresh needed.");
    return false;
  }
  const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;

  try {
    const response = await fetch(refreshUrl);

    if (!response.ok) {
      console.log("Failed to refresh Instagram token");
      return true;
    }

    const updatedToken = await response.json();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + updatedToken.expires_in * 1000);
    await updateInstagramToken(token.id, {
      accessToken: updatedToken.access_token,
      expiresAt: expiresAt.toISOString(),
    });
    console.log("Instagram token refreshed successfully.");
    return false;
  } catch (error) {
    console.log(error);
    return true;
  }
}

export async function deleteToken(tokenId: string) {
  const c = await cookies();
  try {
    const response = await fetch(tokenByIdPath(tokenId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete token");
    }

    console.log("Token deleted successfully.");
  } catch (error) {
    console.error("Error deleting token:", error);
    throw error;
  }
}

export async function getToken() {
  try {
    const { user } = await validateSessionCached();
    const userId = user?.id || "";
    const existingTokens = await getTokenByUserId(userId);
    const deletedTokenIds = new Set<string>();
    if (!existingTokens) {
      return null;
    }
    await Promise.all(
      existingTokens.map(async (token: Token) => {
        const needsDeletion = await refreshInstagramToken(token);
        if (needsDeletion) {
          await deleteToken(token.id);
          deletedTokenIds.add(token.id);
        }
      }),
    );

    const validTokens = existingTokens.filter(
      (token: Token) => !deletedTokenIds.has(token.id),
    );

    return validTokens;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
