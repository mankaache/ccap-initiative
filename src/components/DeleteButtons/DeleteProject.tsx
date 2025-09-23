// components/DeleteProjectButton.tsx
"use client";

import { deleteProject } from "@/firebase/services/deleteService";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: Props) {
  const [loading, setLoading] = useState(false);
const { t } = useTranslation()
  const handleDelete = async () => {
    if (!confirm(`${t("common.delete.confirm")}`)) return;

    try {
      setLoading(true);
      await deleteProject(projectId);
      toast.success(`${t("common.delete.sucess")}`);
      // Optionally: redirect or refresh
      window.location.reload();
    } catch (err: any) {
      toast.error(`${t("common.delete.error")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 mx-20 my-10 text-white px-4 py-2 rounded-md"
    >
      {loading ? t("common.delete.loading") : t("common.delete.delete3")}
    </button>
  );
}


// use 
// <DeleteProjectButton projectId={project.id} organisationId={organisation.id} />

