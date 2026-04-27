import {
  FRILANSEREN_ALLOWED_IMAGE_TYPES,
  FRILANSEREN_MAX_IMAGE_BYTES,
} from "./constants";
import type { UserRole } from "./types";

const mimeExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function getUploadedFile(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
}

export function validateImageFile(file: File | null) {
  if (!file) {
    return null;
  }

  if (!FRILANSEREN_ALLOWED_IMAGE_TYPES.some((type) => type === file.type)) {
    return "Last opp et bilde i JPG, PNG, WebP eller AVIF.";
  }

  if (file.size > FRILANSEREN_MAX_IMAGE_BYTES) {
    return "Bildet er for stort. Maks 2 MB.";
  }

  return null;
}

function getExtensionFromFilename(name: string) {
  const sanitized = name.trim().toLowerCase();
  const dotIndex = sanitized.lastIndexOf(".");

  if (dotIndex === -1) {
    return null;
  }

  return sanitized.slice(dotIndex + 1);
}

export function inferImageExtension(file: File) {
  return mimeExtensions[file.type] ?? getExtensionFromFilename(file.name) ?? "jpg";
}

export function buildProfileImagePath(userId: string, role: UserRole, file: File) {
  const extension = inferImageExtension(file);
  const filename = role === "employer" ? `company-logo.${extension}` : `profile-image.${extension}`;

  return `${userId}/${filename}`;
}
