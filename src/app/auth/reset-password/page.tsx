"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const oobCode = params.get("oobCode"); // from email link

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!oobCode) {
      setMessage("❌ Invalid or missing reset code.");
      return;
    }
    if (password !== confirm) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("✅ Password reset successful! Redirecting to login...");
        alert("Password reset successful!");
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    }
  }

  return (
    <div className="max-w-md mx-auto h-[70vh] mt-10 flex justify-center items-center">
      <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <p>Enter your new password to reset your password</p>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-gradient-to-l from-primary to-secondary text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}

