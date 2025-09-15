"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VerifyEmailPage from "../verify-email/page";
import ResetPasswordPage from "../reset-password/page";

export default function ActionPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {mode === "verifyEmail" && <VerifyEmailPage />}
      {mode === "resetPassword" && <ResetPasswordPage />}
      {!mode && <p>Invalid action link</p>}
    </Suspense>
  );
}
