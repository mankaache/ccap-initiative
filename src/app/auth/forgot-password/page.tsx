"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function handleReset(e: React.FormEvent) {
    
    e.preventDefault();
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success( " Password reset email sent! Check your inbox." );

    } catch (err: any) {
      setLoading(false)
        console.log(err)
        toast.error( 'An error occured, try again later');
    }
  }

  return (
    <div className="mx-auto mt-10 h-[70vh] flex justify-center items-center">
        <div className="max-w-md w-full">
      <h1 className="text-xl font-bold mb-4">{t('auth.forgotPassword')}</h1>
      <p>{t('auth.passwordResetDesc')}</p>
      <form onSubmit={handleReset} className="space-y-4 mt-4">
        <Input
          type="email"
          placeholder={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button 
        disabled={loading}
        type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white p-2 rounded">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t('auth.resetButton')}
        </button>
      </form>
      </div>
    </div>
  );
}
