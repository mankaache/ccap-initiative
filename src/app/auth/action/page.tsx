"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VerifyEmailPage from "../verify-email/page";
import ResetPasswordPage from "../reset-password/page";
import FullPageLoader from "@/components/layout/FullPageLoader";

function ActionContent() {
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


export default function ActionPage() {

  return (
   <Suspense fallback={<FullPageLoader/>}>
     <ActionContent />
   </Suspense>
  );
}