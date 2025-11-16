"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpActor } from "@/firebase/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    actorCategory: "",
  });

  const actorCategories = [
    "ETATIQUES",
    "ONGI",
    "COMMUNE",
    "OSC",
    "OBC",
    "CL",
    "SECTEUR-PRIVEE",
    "other",
  ];

  const [agreed, setAgreed] = useState(false); // NEW STATE
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("You must agree to the Terms & Privacy Policy.");
      toast.error("You must agree to continue.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(`${t("auth.noMatch")}`);
      return;
    }

    setLoading(true);
    try {
      const res = await signUpActor(formData);
      console.log("res sign up", res);
      toast.success(`${t("auth.signupSucess")}`);
      router.push("/auth/please");
    } catch (err: any) {
      setError(err.message);
      toast.error(`${t("auth.error")}`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          {/* Header */}
          <div className="text-center">
            <div className="bg-gradient-hero text-primary-foreground px-6 py-3 rounded-lg font-bold text-2xl inline-block mb-4">
              CCAP
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {t("auth.createAcct")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("auth.createAcctDesc")}
            </p>
          </div>

          {/* Sign Up Form */}
          <Card className="border-border bg-gradient-card shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center">{t("auth.signUp")}</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <Label htmlFor="fullName">{t("auth.full_name")}</Label>
                  <div className="relative mt-1 w-full">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="full_name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        })
                      }
                      placeholder={t("auth.full_name")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t("auth.email")}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Label className="mb-1 text-sm">{t("auth.actor")}</Label>

                <Select
                  value={formData.actorCategory}
                  onValueChange={(value) =>
                    setFormData({ ...formData, actorCategory: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("auth.actorDesc")} />
                  </SelectTrigger>
                  <SelectContent>
                    {actorCategories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div>
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="*******"
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

                  <ul className="list list-disc text-gray-600 text-xs pl-10 pt-2">
                    <li>{t("auth.passwordCondition1")}</li>
                    <li>{t("auth.passwordCondition2")}</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-2">
                    {t("auth.confirm_password")}
                  </Label>
                  <div className="relative mt-1 mb-0">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="*******"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS & CONDITIONS CHECKBOX */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={(value) => setAgreed(Boolean(value))}
                  />

                  <label
                    htmlFor="agree"
                    className="text-sm leading-tight cursor-pointer text-muted-foreground"
                  >
                    {t('auth.condition1')}{" "}
                    <Link
                      href="/terms"
                      className="text-primary underline hover:text-primary-hover"
                    >
                        {t('auth.condition2')}
                    </Link>{" "}
                      {t('auth.condition3')}{" "}
                    <Link
                      href="/privacy"
                      className="text-primary underline hover:text-primary-hover"
                    >
                       {t('auth.condition4')}
                    </Link>.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full bg-gradient-hero hover:opacity-90 shadow-climate"
                >
                  {loading ? t("auth.creating") : t("auth.signUp")}
                </Button>

              </form>

              <div className="mt-6 text-center">
                <span className="text-muted-foreground">
                  {t("auth.haveAcctAlready")}{" "}
                </span>
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  {t("auth.signIn")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
