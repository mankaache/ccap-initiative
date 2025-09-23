"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import FullPageLoader from "@/components/layout/FullPageLoader";
import { useTranslation } from "@/hooks/useTranslation";
import { Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");
  const {t} = useTranslation()
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      if (!oobCode) throw new Error("Invalid code");
      await applyActionCode(auth, oobCode);
      toast.success(`${t("auth.emailVerified")}`);
      router.push("/auth/signin");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(`${t("auth.verifyFailed")}` );
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-3 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold w-full">{t('auth.verifyEmail')}</h1>
      <p className="space-y-2">{t('auth.verifyEmailDesc')}</p>
      <button 
        className="bg-gradient-to-r w-full from-secondary to-primary text-white py-2 px-4 rounded" 
        onClick={handleVerify}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t('auth.verifyNow')}
      </button>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<FullPageLoader/>}>
      <VerifyEmailContent />
    </Suspense>
  );
}