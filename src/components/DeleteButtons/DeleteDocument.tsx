// components/DeleteDocumentButton.tsx
"use client";

import { deleteDocument } from "@/firebase/services/deleteService";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteDocumentButton({ documentId }: { documentId: string }) {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()
const router = useRouter()
  const handleDelete = async () => {
    if (!confirm(`${t('common.delete.confirm')}`)) return;

    try {
      setLoading(true);
      await deleteDocument(documentId);
      toast.success(`${t('common.delete.sucess')}`);
        router.back()
    } catch (err: any) {
      toast.error(`${t('common.delete.error')}` );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 mx-20 my-10 text-white px-4 py-2 rounded-md"
    >
      {loading ? t("common.delete.loading") : t("common.delete.delete2")}
    </button>
  );
}
