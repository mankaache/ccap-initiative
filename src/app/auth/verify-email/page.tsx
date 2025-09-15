"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";


export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");

  const handleVerify = async () => {
    try {
      if (!oobCode) throw new Error("Invalid code");
      await applyActionCode(auth, oobCode);
      alert("Email verified!");
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-3 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold w-full">Verify Email</h1>
      <p className="space-y-2">Click the button below to verify your email address</p>
      <button className="bg-gradient-to-r w-full from-secondary to-primary text-white py-2 px-4 rounded" onClick={handleVerify}>Verify Now</button>
    </div>
  );
}

