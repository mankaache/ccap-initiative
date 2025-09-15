"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("✅ Password reset email sent! Check your inbox.");
      alert( "✅ Password reset email sent! Check your inbox." );
    } catch (err: any) {
        console.log(err)
      setMessage("❌ Error: " + err.message);
    }
  }

  return (
    <div className="mx-auto mt-10 h-[70vh] flex justify-center items-center">
        <div className="max-w-md w-full">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <p>Enter your email to we can send you a link to reset your password</p>
      <form onSubmit={handleReset} className="space-y-4 mt-4">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white p-2 rounded">
          Send Reset Email
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
