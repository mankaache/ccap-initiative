"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  fetchAcceptedProjects,
  fetchReviewProjects,
  ProjectInput,
} from "@/firebase/services/projectService";
import FullPageLoader from "@/components/layout/FullPageLoader";
import ProjectsGrid from "@/components/ProjectsGrid";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import {
  Badge,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export type FilterState = {
  projectType: string[];
  categories: string[];
  funding: string[];
  regions: string[];
};

const ProjectsPage = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<
    (ProjectInput & { id: string; projectReview: string })[]
  >([]);

  const { t } = useTranslation();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const pending = await fetchReviewProjects();
        setProjects(pending);
        console.log("pendingProjects", pending);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen ">
      {loading ? (
        <div className="min-h-screen">
          <FullPageLoader />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-3xl mb-10">{t("admin.project.underReview")}</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects &&
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="h-full bg-gradient-card border-border shadow-elegant hover-lift transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
                        {project?.ProjectTitle}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {project && project.specificLocation},{" "}
                        {project && project.region}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project && project.projectDescription}
                    </p>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <div className="text-xs text-muted-foreground">
                          {t("project.budget")}
                        </div>
                      </div>
                      <div className="font-medium text-foreground">
                        {project && project.budgetAmount} XAF
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <div className="text-xs text-muted-foreground">
                          {t("project.startDate")}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {project && project.startDate}
                      </div>
                    </div>

                    {/* Funding Source */}
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {t("project.location")}
                      </div>
                      <Badge className="text-xs">
                        {project && project.fundingSource}
                      </Badge>
                    </div>

                    {/* Actors */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{t("project.keyActors")}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <p className="bg-secondary px-2 p-1 rounded-lg text-white text-sm uppercase">
                          {project && project.organizationName}
                        </p>
                      </div>
                    </div>

                    {/* Programs */}
                    {project.programs && project.programs.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          {t("project.programs")}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {
                            //@ts-ignore

                            project &&
                              project.programs &&
                              project.programs
                                .slice(0, 2)
                                .map((program, index) => (
                                  <Badge
                                    key={index}
                                    className="text-xs bg-accent/30"
                                  >
                                    {program}
                                  </Badge>
                                ))
                          }
                          {project &&
                            project.programs &&
                            project.programs.length > 2 && (
                              <Badge className="text-xs">
                                +
                                {project.programs &&
                                  project.programs.length - 2}
                              </Badge>
                            )}
                        </div>
                      </div>
                    )}
                    {project &&
                      project.partners &&
                      project.partners.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            {t('admin.project.partners')}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {
                              //@ts-ignore
                              project &&
                                project.partners &&
                                project.partners
                                  .slice(0, 2)
                                  .map((program, index) => (
                                    <Badge
                                      key={index}
                                      className="text-xs bg-accent/30"
                                    >
                                      {program}
                                    </Badge>
                                  ))
                            }
                            {project.partners &&
                              project.partners.length > 2 && (
                                <Badge className="text-xs">
                                  +
                                  {project.partners &&
                                    project.partners.length - 2}
                                </Badge>
                              )}
                          </div>
                        </div>
                      )}

                    {/* Action Button */}
                    <div className="pt-3 border-t border-border">
                      <Link
                        // href ={`/actor/${category}/${id}/${project.id}`}
                        href={`/admin/projects/${project.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
                      >
                        {t("project.viewDetails")}
                        <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          <div className="flex items-center justify-center">
            {projects?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t('admin.project.noUnderReview')}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
