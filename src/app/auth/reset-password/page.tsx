"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import FullPageLoader from "@/components/layout/FullPageLoader";
import { useTranslation } from "@/hooks/useTranslation";
import { Loader2 } from "lucide-react";



function ResetPasswordContent() {
  const {t} = useTranslation()
  const params = useSearchParams();
  const router = useRouter();
  const oobCode = params.get("oobCode"); // from email link

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!oobCode) {
      toast.error(`${t('auth.error')}`);
      return;
    }
    if (password !== confirm) {
      toast.error(`${t('auth.noMatch')}`);
      return;
    }
    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
    
        toast.success(`${t("auth.resetSuccess")}`);
      router.push("/auth/signin");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(`${t("auth.error")}`);
    }
  }

  return (
    <div className="max-w-md mx-auto h-[70vh] mt-10 flex justify-center items-center">
      <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">{t('auth.resetPassword')}</h1>
      <p>{t('auth.resetDesc')}</p>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          type="password"
          placeholder={t('auth.newPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
          <div>
            <ul className="list list-disc text-gray-600 text-xs pl-10 pt-2">
              <li className="">
                {t('auth.passwordCondition1')} 
              </li>
              <li>
                {t('auth.passwordCondition2')}
              </li>
            </ul>
          </div>
        <Input
          type="password"
          placeholder={t('auth.confirmPassword')}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-gradient-to-l from-primary to-secondary text-white p-2 rounded">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t('auth.resetPassword')}
        </button>
      </form>
      </div>
    </div>
  );
}



export default function ResetPasswordPage() {
  

  return (
    <Suspense fallback={<FullPageLoader/>}>
         <ResetPasswordContent />
       </Suspense>
  );
}

