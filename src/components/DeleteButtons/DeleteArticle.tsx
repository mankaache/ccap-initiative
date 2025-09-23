// components/DeleteArticleButton.tsx
"use client";

import { deleteArticle } from "@/firebase/services/deleteService";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteArticleButton({ articleId }: { articleId: string }) {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()

  const handleDelete = async () => {
    if (!confirm(`${t('common.delete.confirm')}`)) return;

    try {
      setLoading(true);
      await deleteArticle(articleId);
      toast.success(`${t('common.delete.sucess')}`);
      window.location.reload();
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
      {loading ? t("common.delete.loading") : t("common.delete.delete")}
    </button>
  );
}
