"use server";

interface FetchError extends Error {
  response?: {
    data?: unknown;
  };
}

export async function getInstagramMedia(accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v24.0/me/media?fields=id,caption,media_type,media_url,alt_text,permalink,thumbnail_url,timestamp&access_token=${accessToken}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error fetching Instagram media:",
        JSON.stringify(errorData),
      );
      return;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
