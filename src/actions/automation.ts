"use server";

import { automationPath } from "@/lib/paths";
import {
  LeadMagnetField,
  Platform,
  ResponseSource,
  ResponseType,
  TriggerSource,
  TriggerType,
} from "@/lib/types";
import { FormState } from "../lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface AutomationData {
  platform: Platform;
  organisationId: string;
  createdById?: string;
  leadMagnetId?: string;
  assetId: string;
  assetUrl: string;
  triggerSource: TriggerSource;
  triggerType: TriggerType;
  triggerValues: string[];
  responseButtonList: string[];
  responseSource: ResponseSource;
  responseType: ResponseType;
  replyToComment: boolean;
  verifyFollower: boolean;
  enforceFollow: boolean;
  fieldsToCapture: LeadMagnetField[];
  trailingAutomationId?: string;
}

export async function createAutomation(
  data: AutomationData,
  formState: FormState,
  formData: FormData,
) {
  const c = await cookies();

  const isActive = true;
  const responseContent = formData.get("responseContent") as string;
  const commentReplies = formData.getAll("commentReplies") as string[];
  const verificationMessage = formData.get("verificationMessage") as string;
  const verificationButtonText = formData.get(
    "verificationButtonText",
  ) as string;
  try {
    const response = await fetch(automationPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        isActive,
        createdById: data.createdById,
        leadMagnetId: data.leadMagnetId,
        assetId: data.assetId,
        assetUrl: data.assetUrl,
        triggerSource: data.triggerSource,
        triggerType: data.triggerType,
        triggerValues: data.triggerValues,
        responseSource: data.responseSource,
        responseType: data.responseType,
        responseContent,
        responseButtonList: data.responseButtonList,
        replyToComment: data.replyToComment,
        commentReplies,
        verifyFollower: data.verifyFollower,
        enforceFollow: data.enforceFollow,
        verificationMessage,
        verificationButtonText,
        platform: data.platform,
        organisationId: data.organisationId,
        fieldsToCapture: data.fieldsToCapture,
        trailingAutomationId: data.trailingAutomationId || null,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return {
        success: false,
        message: "Lead Magnet creation failed",
        errors: JSON.parse(responseData.errors),
        itemId: "",
      };
    }

    const newLeadMagnet = await response.json();

    revalidatePath("/automations");
    revalidatePath(`/lead-magnets/${data.leadMagnetId}`);

    return {
      success: true,
      message: "Automation created successfully",
      errors: {},
      itemId: newLeadMagnet.leadMagnet.id,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
      itemId: "",
    };
  }
}

export async function createAutomationReviewer(
  data: AutomationData,
  formState: FormState,
  formData: FormData,
) {
  const c = await cookies();

  const isActive = true;
  const responseContent =
    "Thank you for showing interest. Here's the resource you requested";
  const commentReplies = ["Got it! Check your DMs", "Sent you a DM"];
  const verificationMessage =
    "Before I send you the resource, please verify that you're a follower by clicking the button below.";
  const verificationButtonText = "I'm a follower";

  try {
    const response = await fetch(automationPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        isActive,
        createdById: data.createdById,
        leadMagnetId: data.leadMagnetId,
        assetId: data.assetId,
        assetUrl: data.assetUrl,
        triggerSource: data.triggerSource,
        triggerType: data.triggerType,
        triggerValues: data.triggerValues,
        responseSource: data.responseSource,
        responseType: data.responseType,
        responseContent,
        responseButtonList: data.responseButtonList,
        replyToComment: data.replyToComment,
        commentReplies,
        verifyFollower: data.verifyFollower,
        enforceFollow: data.enforceFollow,
        verificationMessage,
        verificationButtonText,
        platform: data.platform,
        organisationId: data.organisationId,
        fieldsToCapture: data.fieldsToCapture,
        trailingAutomationId: data.trailingAutomationId || null,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return {
        success: false,
        message: "Lead Magnet creation failed",
        errors: JSON.parse(responseData.errors),
        itemId: "",
      };
    }

    const newLeadMagnet = await response.json();

    revalidatePath("/automations");
    revalidatePath(`/instagram-review`);

    return {
      success: true,
      message: "Automation created successfully",
      errors: {},
      itemId: newLeadMagnet.leadMagnet.id,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
      itemId: "",
    };
  }
}

export async function updateAutomation(
  automationId: string,
  data: AutomationData,
  formState: FormState,
  formData: FormData,
) {
  const c = await cookies();

  const responseContent = formData.get("responseContent") as string;
  const commentReplies = formData.getAll("commentReplies") as string[];
  const verificationMessage = formData.get("verificationMessage") as string;
  const verificationButtonText = formData.get(
    "verificationButtonText",
  ) as string;

  try {
    const response = await fetch(`${automationPath()}/${automationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        leadMagnetId: data.leadMagnetId,
        assetId: data.assetId,
        assetUrl: data.assetUrl,
        triggerSource: data.triggerSource,
        triggerType: data.triggerType,
        triggerValues: data.triggerValues,
        responseSource: data.responseSource,
        responseType: data.responseType,
        responseContent,
        responseButtonList: data.responseButtonList,
        replyToComment: data.replyToComment,
        commentReplies,
        verifyFollower: data.verifyFollower,
        enforceFollow: data.enforceFollow,
        verificationMessage,
        verificationButtonText,
        fieldsToCapture: data.fieldsToCapture,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return {
        success: false,
        message: "Automation update failed",
        errors: responseData.errors ? JSON.parse(responseData.errors) : {},
        itemId: "",
      };
    }

    revalidatePath("/automations");
    revalidatePath(`/lead-magnets/${data.leadMagnetId}`);

    return {
      success: true,
      message: "Automation updated successfully",
      errors: {},
      itemId: automationId,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
      itemId: "",
    };
  }
}
