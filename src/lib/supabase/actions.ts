"use server";

import { redirect } from "next/navigation";

import { hasSupabaseAuthConfig, missingSupabaseEnvs } from "@/lib/env";
import type { FrilanserenActionState } from "@/lib/frilanseren/types";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "@/lib/frilanseren/validation";

import { absoluteAuthUrl } from "./auth";
import { createServerComponentClient } from "./serverClient";

const loginErrorState: FrilanserenActionState = {
  status: "error",
  message: "Feil e-post eller passord. Prøv igjen.",
};

function authUnavailableState(): FrilanserenActionState {
  console.error("[frilanseren/auth-unavailable]", {
    missing: missingSupabaseEnvs(),
  });
  return {
    status: "error",
    message:
      "Innlogging er midlertidig utilgjengelig. Vi jobber med å få det opp igjen. Prøv igjen om litt.",
  };
}

function getSafeRedirectTarget(value: FormDataEntryValue | null) {
  const target = String(value ?? "").trim();

  if (!target.startsWith("/") || target.startsWith("//")) {
    return "/frilanseren/dashboard";
  }

  return target;
}

function issueMapToFieldErrors(error: {
  issues: Array<{
    path: PropertyKey[];
    message: string;
  }>;
}) {
  return Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
}

export async function signInWithPasswordAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const payload = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  if (!hasSupabaseAuthConfig()) {
    return authUnavailableState();
  }

  const supabase = await createServerComponentClient();
  const { error } = await supabase.auth.signInWithPassword(payload.data);

  if (error) {
    const errorMessage = error.message.toLowerCase();

    if (errorMessage.includes("too many") || errorMessage.includes("rate limit")) {
      return {
        status: "error",
        message: "For mange mislykkede forsøk. Prøv igjen om noen minutter.",
      };
    }

    return loginErrorState;
  }

  redirect(getSafeRedirectTarget(formData.get("next")));
}

export async function requestPasswordResetAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const payload = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  if (!hasSupabaseAuthConfig()) {
    return authUnavailableState();
  }

  const supabase = await createServerComponentClient();
  const { error } = await supabase.auth.resetPasswordForEmail(payload.data.email, {
    redirectTo: absoluteAuthUrl("/auth/confirm?next=/frilanseren/reset-password"),
  });

  if (error) {
    return {
      status: "error",
      message: "Vi klarte ikke å sende e-posten akkurat nå. Prøv igjen.",
    };
  }

  return {
    status: "success",
    message: "Hvis adressen finnes hos oss, har vi sendt deg en lenke for å lage nytt passord.",
  };
}

export async function resetPasswordAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const payload = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  if (!hasSupabaseAuthConfig()) {
    return authUnavailableState();
  }

  const supabase = await createServerComponentClient();
  const { error } = await supabase.auth.updateUser({
    password: payload.data.password,
  });

  if (error) {
    return {
      status: "error",
      message: "Vi kunne ikke oppdatere passordet ditt akkurat nå. Prøv igjen.",
    };
  }

  return {
    status: "success",
    message: "Passordet ditt er oppdatert. Du kan logge inn med det nye passordet nå.",
  };
}

export async function signOutAction() {
  if (hasSupabaseAuthConfig()) {
    try {
      const supabase = await createServerComponentClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error("[frilanseren/signout-failed]", error);
    }
  }
  redirect("/frilanseren/login");
}
