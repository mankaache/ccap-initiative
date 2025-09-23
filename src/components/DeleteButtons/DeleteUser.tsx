// components/DeleteAccountButton.tsx
"use client";

import { auth } from "@/firebase/firebaseConfig";
import { deleteUserAccount } from "@/firebase/services/deleteService";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "react-toastify";


export default function DeleteAccountButton() {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()

  const handleDelete = async () => {
    if (!confirm(`${t("common.delete.confirmUser")}`)) return;

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error(`${t("common.delete.login")}`);

      //@ts-ignore
      await deleteUserAccount(user.uid);
      toast.success(`${t("common.delete.sucess")}`);
      // Optionally redirect to home
      window.location.href = "/";
    } catch (err: any) {
      alert(`${t("common.delete.userError")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-700 mx-20 my-10 text-white px-4 py-2 rounded-md"
    >
      {loading ? t("common.delete.loading") : t("common.delete.delete4")}
    </button>
  );
}
