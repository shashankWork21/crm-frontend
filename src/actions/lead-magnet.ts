"use server";

import { cookies } from "next/headers";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { leadMagnetPath } from "@/lib/paths/lead-magnet";
import { FormState } from "@/lib/types";
import { revalidatePath } from "next/cache";

interface LeadMagnetData {
  createdById: string;
  organisationId: string;
  files?: File[];
}

const s3 = new S3Client({
  region: process.env.R2_REGION || "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

async function uploadFileToS3(
  file: File,
  organisationId: string,
): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileName = file.name;
  const timestamp = Date.now();
  const folderName = `resources-${organisationId}`;
  const objectKey = `${folderName}/${timestamp}_${fileName}`;

  // Upload file to S3
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || "",
    Key: objectKey,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  });

  await s3.send(uploadCommand);

  // Generate presigned URL (valid for 7 days)
  const presignedUrl = `${process.env.R2_CUSTOM_DOMAIN}/${objectKey}`;
  return presignedUrl;
}

export async function createLeadMagnet(
  data: LeadMagnetData,
  formState: FormState,
  formData: FormData,
) {
  const c = await cookies();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  let fileUrl = formData.get("fileUrl") as string;

  // If file is uploaded, upload to S3 and get presigned URL
  if (data?.files && data.files.length > 0) {
    try {
      fileUrl = await uploadFileToS3(data.files[0], data.organisationId);
    } catch (error) {
      console.error("File upload error:", error);
      return {
        success: false,
        message: "File upload failed",
        errors: { file: "Failed to upload file to storage" },
        itemId: "",
      };
    }
  }

  try {
    const response = await fetch(leadMagnetPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        title,
        description,
        fileUrl,
        createdById: data.createdById,
        organisationId: data.organisationId,
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

    revalidatePath("/lead-magnets");
    return {
      success: true,
      message: "Lead Magnet created successfully",
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
