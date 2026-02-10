"use server";

export interface InstagramComment {
  id: string;
  text: string;
  from: {
    username: string;
    id: string;
  };
  timestamp: string;
  parent_id?: string;
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

export async function getCommentsForMedia(
  mediaId: string,
  accessToken: string,
): Promise<InstagramComment[] | undefined> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v24.0/${mediaId}/comments?fields=id,text,username,timestamp,parent_id,from&access_token=${accessToken}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error fetching comments for media:",
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
