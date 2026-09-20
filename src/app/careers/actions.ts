"use server";

import { submitApplication } from "@/lib/api";

/**
 * Receive a job application and forward it to the backend.
 *
 * The public form posts here rather than straight to the Django host: it keeps
 * the API key on the server, avoids cross-origin requests entirely, and gives
 * one place to reject junk before anything reaches PythonAnywhere's small CPU
 * budget. The backend validates all of this again — this is the friendly pass,
 * not the authoritative one.
 */

const MAX_RESUME_BYTES = 4 * 1024 * 1024; // Under Vercel's ~4.5MB action limit.

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export interface ApplyState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name to focus, so the form can point at what needs fixing. */
  field?: string;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function applyToJob(
  _previous: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  const name = read("name");
  const email = read("email");
  const phone = read("phone");

  if (!name) {
    return { status: "error", message: "Please tell us your name.", field: "name" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "That email address does not look right.",
      field: "email",
    };
  }

  // Loose on purpose — the studio hires across India and abroad, so this only
  // catches obvious typos rather than enforcing a format.
  if (phone && phone.replace(/\D/g, "").length < 7) {
    return {
      status: "error",
      message: "That phone number looks too short.",
      field: "phone",
    };
  }

  const graduationYear = read("graduationYear");
  if (graduationYear) {
    const year = Number(graduationYear);
    const thisYear = new Date().getFullYear();
    if (!Number.isInteger(year) || year < 1950 || year > thisYear + 6) {
      return {
        status: "error",
        message: "Please check the graduation year.",
        field: "graduationYear",
      };
    }
  }

  for (const field of ["portfolioUrl", "linkedinUrl"] as const) {
    const value = read(field);
    if (value && !isHttpUrl(value)) {
      return {
        status: "error",
        message:
          field === "portfolioUrl"
            ? "Please give a full portfolio link, starting with https://"
            : "Please give a full LinkedIn link, starting with https://",
        field,
      };
    }
  }

  const resume = formData.get("resume");
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return {
        status: "error",
        message: "Your CV must be smaller than 4MB.",
        field: "resume",
      };
    }
    if (!ALLOWED_RESUME_TYPES.has(resume.type)) {
      return {
        status: "error",
        message: "Please attach a PDF or Word document.",
        field: "resume",
      };
    }
  } else {
    // An empty file input still arrives as a zero-byte File; drop it so the
    // backend does not try to store an empty attachment.
    formData.delete("resume");
  }

  const result = await submitApplication(formData);

  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  return {
    status: "success",
    message: "Thank you — your application is with our team.",
  };
}
