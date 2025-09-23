"use client";

import { Input } from "@/components/ui/input";
import { signUpAdmin } from "@/firebase/services/adminService";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteKey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()  

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(`${t("auth.noMatch")}`);
      return;
    }
  

    setLoading(true);
    try {
      await signUpAdmin(form);
     toast.success(`${t("auth.signupSucess'")}`);
           router.push("/auth/please");
    } catch (err: any) {
      setError(err.message);
      toast.error(`${t("auth.error")}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <h1 className="text-xl font-bold text-center pt-20">{t('auth.createAdmin')}</h1>

    <form onSubmit={handleSignup} className="space-y-4 max-w-md pb-20 mx-auto mt-10">
      <Input
        type="text"
        placeholder={t('auth.first_name')}
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <Input
        type="text"
        placeholder={t('auth.last_name')}
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <Input
        type="email"
        placeholder={t('auth.email')}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder={t('auth.password')}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Input
        type="password"
        placeholder={t('auth.confirm_password')}
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      {/* Invite Key */}
      <Input
        type="text"
        placeholder={t('auth.adminInviteKey')}
        value={form.inviteKey}
        required
        onChange={(e) => setForm({ ...form, inviteKey: e.target.value })}
      />

      {error && <p className="text-red-500">{error}</p>}
      <button disabled={loading} className="bg-gradient-to-l from-primary to-secondary text-white p-2 rounded" type="submit" >
        {loading ? t('auth.creating') : t('auth.adminBtn')}
      </button>
    </form>
    </>
  );
}

