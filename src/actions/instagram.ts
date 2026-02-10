"use server";

import { FormState } from "@/lib/types";
import { validateSession } from "./auth";

export async function replyToInstagramComment(
  commentId: string,
  accessToken: string,
  message: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v24.0/${commentId}/replies?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error replying to Instagram comment:",
        JSON.stringify(errorData),
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected error while replying to comment:", error);
    return false;
  }
}

export async function sendInstagramDirectMessage(
  data: {
    recipientId: string;
    accessToken: string;
    buttons?: {
      type: "web_url" | "postback";
      title: string;
      payload?: string; // Required for postback
      url?: string; // Required for web_url
    }[];
  },
  formState: FormState,
  formData: FormData,
) {
  const { user } = await validateSession();
  if (!user) {
    return {
      success: false,
      message: "User not authenticated",
      errors: {},
    };
  }
  const message = formData.get("message") as string;
  const messageUrl = `https://graph.instagram.com/v24.0/${user.instagramId}/messages`;

  const messageData = {
    recipient: {
      id: data.recipientId,
    },
    message: {
      ...(!!data.buttons && {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: message,
            buttons: data.buttons.map((btn) => {
              const baseButton = {
                type: btn.type,
                title: btn.title,
              };
              if (btn.type === "web_url") {
                return {
                  ...baseButton,
                  url: btn.url,
                };
              } else if (btn.type === "postback") {
                return {
                  ...baseButton,
                  payload: btn.payload,
                };
              }
            }),
          },
        },
      }),
      ...(!data.buttons && { text: message }),
    },
  };
  try {
    const response = await fetch(messageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error sending Instagram direct message:",
        JSON.stringify(errorData),
      );
      return {
        success: false,
        message: "Failed to send message",
        errors: {},
      };
    }

    return {
      success: true,
      message: "Message sent successfully",
      errors: {},
    };
  } catch (error) {
    console.error("Unexpected error while sending direct message:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
