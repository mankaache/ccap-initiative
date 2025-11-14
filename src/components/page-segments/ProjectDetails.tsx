"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  fetchProjectById,
} from "@/firebase/services/projectService";

import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Target,
  Building,
  FileText,
  Award,
  Lightbulb,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FullPageLoader from "../layout/FullPageLoader";
import { useAuth } from "@/firebase/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { forceDownload } from "@/utils/download";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { projectId, id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const proj = await fetchProjectById(projectId as string);

        // Optional: check if project belongs to the correct organisation
        if (proj.organizationId !== id) {
          console.error("Project does not belong to this organisation");
          setProject(null);
          return;
        }

        setProject(proj);
      } catch (err: any) {
        console.error(err);
        console.error(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, id]);

  
  if (loading) {
    return (
      <div className="min-h-screen">
        <FullPageLoader />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto">
        <Button
          onClick={() => router.back()}
          className="inline-flex bg-transparent  items-center gap-2 font-bold text-primary hover:text-primary mt-4"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('admin.articles.msg2')}
        </Button>
        <div className="max-w-5xl h-[70vh] flex justify-center items-centermx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-red-500">{t('admin.project.notFound')}</h2>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-ccap-orange/10 text-ccap-orange border-ccap-orange/20";
      case "completed":
        return "bg-ccap-green/10 text-ccap-green border-ccap-green/20";
      case "planned":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Button
            onClick={() => router.back()}
            className="inline-flex border-none bg-transparent items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('admin.articles.msg2')}
          </Button>

          <div className="flex flex-col items-start  gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    project && project.status
                  )} border-white/20 bg-white/10`}
                >
                  {project &&
                    project.status.charAt(0).toUpperCase() + project &&
                    project.status.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/10 text-white border-white/20"
                >
                  {project && project.category}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {project && project.ProjectTitle}
              </h1>

              <p className="text-xl text-white/90 mb-6">
                {project && project.projectDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span>{project && project.region}</span>
                </div>
                <div className="  flex items-center gap-3">
                    {project && project.specificLocation.map((loc:any, indx:number)=>{
                      <span key={indx}> <MapPin className="h-5 w-5" /> {loc.name}</span>
                  })}
                  </div>
                <div className="flex items-center gap-2">
                  <span>{project && project.budgetAmount}XAF</span>
                </div>
              </div>
               
            </div>

          <div>
             <Link
                    className="bg-gradient-to-l from-primary  to-secondary text-white py-2 px-4 rounded font-semibold"
                    href={`${pathname}/demonstration`}
                  >
                    {t('admin.project.checkTransparency')}
                  </Link>
          </div>

           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {t('admin.project.overview')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">  {t('admin.project.projectType')}</h3>
                  <p className="text-muted-foreground">
                    {project && project.projectType}
                  </p>
                </div>

                {user && project?.projectReview === "Pending" && (
                  <>
                <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                     {t('admin.project.projectReview')}
                    </h3>
                    <p className="text-muted-foreground font-semibold text-primary">
                      {project && project.projectReview}
                    </p>
                  </div></>
                )}

<Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t("project.websiteLink")}
                  </h3>
                  <Link href={project && project.websiteLink || ''} className="text-purple-700 underline font-semibold">
                    {project && project.websiteLink}
                  </Link>
                </div>
                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                   {t('admin.project.interventionLogic')}
                  </h3>
                  <p className="text-muted-foreground">
                    {project && project.interventionLogic}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Specific Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t('admin.project.specificObjective')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project && project.specificObjectives}
                </ul>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t("project.impact")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project && project.projectImpact}
                </ul>
              </CardContent>
            </Card>

            {/* Results & Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                   {t('admin.project.programs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project &&
                    project.programs.map((result: any, index: any) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-ccap-orange mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                   {t('admin.project.partners')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project &&
                    project.partners.map((result: any, index: any) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-ccap-orange mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                     {t('admin.project.orgInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    {project && project.organizationName}
                  </h3>
                  <Badge variant="outline" className="mb-3">
                    {project && project.category}
                  </Badge>
                  <p className="text-muted-foreground">
                    {project && project.orgdescription}
                  </p>
                </div>
              </CardContent>
            </Card>
              {/* images */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Building className="h-5 w-5 text-primary" />
                              {t('admin.project.images')}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex gap-9 items-center flex-wrap md:flex-nowrap">
                              {project &&
                                project.images?.map((image: any, index: any) => (
                                  <div key={index} className="relative w-full h-48 ">
                                    <Image
                                      src={image}
                                      width={300}
                                      height={300}
                                      placeholder="blur"
                                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                                      alt={project?.ProjectTitle}
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                            </div>
                          </CardContent>
                        </Card>

                          <button
                            onClick={() =>
                              forceDownload(
                                project && project.pdf,
                                project && project.ProjectTitle
                              )
                            }
                            className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {t("actor.documentDownload")}
                          </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                   {t('admin.project.projectDetails')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-medium"> {t('admin.project.startDate')}</div>
                    <div className="text-muted-foreground">
                      {project && project.startDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-ccap-orange shrink-0" />
                  <div>
                    <div className="font-medium">{t('admin.project.endDate')}</div>
                    <div className="text-muted-foreground">
                      {project && project.endDate}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="h-4 w-4 text-ccap-green shrink-0" />
                  <div>
                    <div className="font-medium">{t('admin.project.budget')}</div>
                    <div className="text-muted-foreground">
                      {project && project.budgetAmount} XAF
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Lightbulb className="h-4 w-4 text-blue-500 shrink-0" />
                  <div>
                    <div className="font-medium">{t('admin.project.fundingSource')}</div>
                    <div className="text-muted-foreground">
                      {project && project.fundingSource}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                 {t('admin.project.locationDetails')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium"> {t('admin.project.specificLocation')}</div>
                  <div className="text-muted-foreground text-sm flex items-center gap-3">
                    {project && project.specificLocation.map((loc:any, indx:number)=>{
                      <span key={indx}> <MapPin className="h-5 w-5" /> {loc.name}</span>
                  })}
                  </div>

                  <div className="font-medium mt-4">{t('admin.project.region')}</div>
                  <div className="flex flex-wrap gap-1">
                    {project &&
                      project.region.map((area: any, index: any) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {area}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Actors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  {t('admin.project.keyActors')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="gap-2 capitalize">
                    <div className=" rounded-full shrink-0">
                      {project && project.category}
                    </div>
                    <span className="text-muted-foreground pl-4 block mt-2">
                      {project && project.subcategory}
                    </span>
                    <span className="text-muted-foreground pl-8 block mt-2">
                      {project && project.organizationName}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
