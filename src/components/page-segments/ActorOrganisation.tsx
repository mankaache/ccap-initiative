"use client";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { getCategoryTitle, organizations } from "@/data/organisation";
import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { getMockProjects } from "@/data/mockProjects";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

const ActorOrganisation = () => {
  const mockProjects = getMockProjects();
  const { category, id } = useParams<{ category: string; id: string }>();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    
    if (category && id) {
      const foundOrg = organizations.find(
        (org) => org.category === category && org.id === id
      );
      //@ts-ignore
      setOrganization(foundOrg);
      setLoading(false);
    }
  }, [category, id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t("common.loading")}</div>
      </div>
    );
  }

  // Show error if organization not found
  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("actor.orgNotFound")}</h1>
          <Link 
            href="/actor" 
            className="text-primary hover:underline"
          >
            {t("actor.backToActors")}
          </Link>
        </div>
      </div>
    );
  }

  //@ts-ignore
  const categoryTitle = getCategoryTitle(organization.category);

  return (
    <div className="">
      <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 h-40 w-full">
        <div className="max-w-5xl mx-auto flex h-full items-center px-4">
          <Link
          //@ts-ignore
            href={`/actor/${organization.category}`}
            className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-primary transition-fast mb-4"
          >
            <ArrowLeft className="h-7 w-7" />
            {t("actor.backTo")} {categoryTitle}
          </Link>
        </div>
      </div>

      <main className="min-h-screen max-w-5xl mx-auto mt-5 px-4 lg:px-8 py-8">
        {/* Organization header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {
            //@ts-ignore
            organization.name}</h1>
          <p className="text-muted-foreground mt-2">
            {
            //@ts-ignore
            organization.description || t("actor.noDescription")}
          </p>
        </div>

        <div className="mb-8">
          <div className="mt-4 font-semibold text-muted-foreground">
            {t("actor.total")} {mockProjects.length} {t('actor.projectFound')}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {mockProjects.map((project) => (
            <div key={project.id} className="animate-fade-in">
              <ProjectCard
              //@ts-ignore
                category={organization.category}
                //@ts-ignore
                id={organization.id}
                //@ts-ignore
                subcategory={organization.subcategory}
                project={project}
              />
            </div>
          ))}
        </div>
        
        {mockProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("actor.noProjects")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ActorOrganisation;