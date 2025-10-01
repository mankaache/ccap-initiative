"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAdmin } from "@/firebase/services/adminService";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, User, LogIn } from "lucide-react";
export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const { t } = useTranslation();

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
      <h1 className="text-xl font-bold text-center pt-20">
        {t("auth.createAdmin")}
      </h1>

      <form
        onSubmit={handleSignup}
        className="space-y-4 max-w-md pb-20 mx-auto mt-10"
      >
        <Input
          type="text"
          placeholder={t("auth.first_name")}
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <Input
          type="text"
          placeholder={t("auth.last_name")}
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <Input
          type="email"
          placeholder={t("auth.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={t("auth.password")}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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
        </div>

        <div>
          <div className="relative mt-1 mb-0">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              placeholder={t("auth.confirm_password")}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2  transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Invite Key */}
        <Input
          type="text"
          placeholder={t("auth.adminInviteKey")}
          value={form.inviteKey}
          required
          onChange={(e) => setForm({ ...form, inviteKey: e.target.value })}
        />

        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={loading}
          className="bg-gradient-to-l from-primary to-secondary text-white p-2 rounded"
          type="submit"
        >
          {loading ? t("auth.creating") : t("auth.adminBtn")}
        </button>
      </form>
    </>
  );
}
