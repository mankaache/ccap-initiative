"use client";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getCategoryTitle, } from "@/data/organisation";
import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { useTranslation } from "@/hooks/useTranslation";
import { use, useEffect, useState } from "react";
import { fetchOrganisationById, fetchProjectsByOrganisationId } from "@/firebase/services/projectService";
import { toast } from "react-toastify";
import FullPageLoader from "../layout/FullPageLoader";
import { Button } from "../ui/button";

const ActorOrganisation = () => {
  const { id } = useParams<{ category: string; id: string }>();
  const router = useRouter();
  const [organization, setOrganization] = useState([]);
  const [oneOrganization, setOneOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // fetchProjectsByOrganisationId

  useEffect(() => {
    
    const loadOrg = async () => {
            try {
              setLoading(true);
              const allOrga = await fetchProjectsByOrganisationId(id);
              const j = await fetchOrganisationById(id);
              setOneOrganization(j)
              setOrganization(allOrga as any);
              console.log('allOrga', allOrga);
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
      
              <FullPageLoader/>
            </div>
          );
        }
  

  // Show error if organization not found
  if (organization?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("actor.noOrg")}</h1>
          <Button
          onClick={() => router.back()}
            className="text-primary bg-transparent hover:bg-transparent hover:underline"
          >
            {t("actor.back")}
          </Button>
        </div>
      </div>
    );
  }

  //@ts-ignore
  const categoryTitle = getCategoryTitle(oneOrganization.name);

  return (
    <div className="">
      <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 h-40 w-full">
        <div className="max-w-5xl mx-auto flex h-full items-center px-4">
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-primary bg-transparent hover:bg-transparent transition-fast mb-4"
          >
            <ArrowLeft className="h-7 w-7" />
            {t("actor.backTo")} {categoryTitle.toUpperCase()}
          </Button>
        </div>
      </div>

      <main className="min-h-screen max-w-5xl mx-auto mt-5 px-4 lg:px-8 py-8">
        {/* Organization header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {
            //@ts-ignore
            oneOrganization.name}</h1>
          <p className="text-muted-foreground mt-2">
            {
            //@ts-ignore
            oneOrganization.description || ''}
          </p>
        </div>

        <div className="mb-8">
          <div className="mt-4 font-semibold text-muted-foreground">
            {t("actor.total")} {organization?.length} {t('actor.projectFound')}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {organization?.map((project:any) => (
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
        
        {organization?.length === 0 && (
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