"use client";
import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  
  fetchProjectsByOrganisationId,
} from "@/firebase/services/projectService";
import { toast } from "react-toastify";
import FullPageLoader from "@/components/layout/FullPageLoader";
import ProjectCard from "@/components/ProjectCard";
import { ArrowLeft } from "lucide-react";

export default function ActorDetails() {
  const navigate = useRouter();
  const params = useParams();

  const { id } = params;

  const router = useRouter();
  const [organization, setOrganization] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // fetchProjectsByOrganisationId

  useEffect(() => {
    const loadOrg = async () => {
      try {
        setLoading(true);
        const allOrga = await fetchProjectsByOrganisationId(id as string);

        setOrganization(allOrga as any);
        console.log("allOrga", allOrga);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    loadOrg();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <FullPageLoader />
      </div>
    );
  }

  // Show error if organization not found
  if (organization?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("actor.orgNotFound")}</h1>
          <Button
            onClick={() => router.back()}
            className="text-primary bg-transparent hover:bg-transparent hover:underline"
          >
            {t("actor.backToActors")}
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "ongoing":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push("/admin/actors")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Organisation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {organization?.map((project: any) => (
          <div key={project.id} className="animate-fade-in">
            <ProjectCard
              //@ts-ignore
              category={project.category}
              //@ts-ignore
              id={project.organizationId}
              //@ts-ignore
              subcategory={project.subcategory}
              project={project}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
