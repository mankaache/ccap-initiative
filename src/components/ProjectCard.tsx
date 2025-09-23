import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  MapPin,
  Users,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Circle,
  Edit,
  Edit2,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { organizations } from "@/data/organisation";
import { useAuth } from "@/firebase/useAuth";

const ProjectCard = ({ project, category, subcategory, id }: any) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const getStatusIcon = () => {
    switch (project && project.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "ongoing":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusStyles = () => {
    switch (project && project.status) {
      case "completed":
        return "status-completed";
      case "ongoing":
        return "status-ongoing";
      default:
        return "status-planned";
    }
  };

  return (
    <Card className="h-full border-border shadow-elegant hover-lift transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {project?.ProjectTitle}
          </CardTitle>
          <Badge
            className={`flex items-center gap-1 ${getStatusStyles()} text-xs`}
          >
            {getStatusIcon()}
            {t(`${project && project.status}`)}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
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
          <Badge variant="outline" className="text-xs">
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
        {project && project.programs && project.programs.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              {t("project.programs")}
            </div>
            <div className="flex flex-wrap gap-1">
              {
                
                  project &&
                  project.programs &&
                  //@ts-ignore
              
                  project.programs.slice(0, 2).map((program, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-accent/30"
                    >
                      {program}
                    </Badge>
                  ))
              }
              {project && project.programs && project.programs.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{project.programs && project.programs.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        {project && project.partners && project.partners.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Partners</div>
            <div className="flex flex-wrap gap-1">
              {
                project &&
                  project.partners &&
                  //@ts-ignore
              
                  project.partners.slice(0, 2).map((program, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-accent/30"
                    >
                      {program}
                    </Badge>
                  ))
              }
              {project && project.partners && project.partners.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{project.partners && project.partners.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <Link
            href={`${
              user?.role === "admin"
                ? `/admin/projects/${project.id}`
                : subcategory
                ? `/actor/${category ?? project.category}/${
                    subcategory ?? project.subcategory
                  }/${id ?? project.organizationId}/${project.id}`
                : `/actor/${category ?? project.category}/details/${
                    id ?? project.organizationId
                  }/${project.id}`
            }`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
          >
            {t("project.viewDetails")}
            <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
            {user && (user.role === "admin" || user.uid === project.createdBy) && (
          <Link
            className="font-semibold bg-primary text-white px-4 py-1 rounded-lg flex items-center gap-2"
            href={
              user?.role === "admin"
                ? `/admin/projects/edit/${project.id}`
                : `/project/${project.id}`
            }
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
