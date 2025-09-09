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
  Circle
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";


interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    status: "ongoing" | "completed" | "planned";
    budget: string;
    fundingSource: string;
    location: string;
    region: string;
    actors: string[];
    startDate: string;
    endDate?: string;
    category: string;
    programs: string[];
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  
  const getStatusIcon = () => {
    switch (project.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "ongoing":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusStyles = () => {
    switch (project.status) {
      case "completed":
        return "status-completed";
      case "ongoing":
        return "status-ongoing";
      default:
        return "status-planned";
    }
  };

  return (
    <Card className="h-full bg-gradient-card border-border shadow-elegant hover-lift transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {project.title}
          </CardTitle>
          <Badge className={`flex items-center gap-1 ${getStatusStyles()} text-xs`}>
            {getStatusIcon()}
            {t(`${project.status}`)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{project.location}, {project.region}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div className="text-xs text-muted-foreground">{t('project.budget')}</div>
          </div>
          <div className="font-medium text-foreground">{project.budget}</div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-secondary" />
            <div className="text-xs text-muted-foreground">{t('project.startDate')}</div>
          </div>
          <div className="text-muted-foreground">{project.startDate}</div>
        </div>

        {/* Funding Source */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{t('project.location')}</div>
          <Badge variant="outline" className="text-xs">
            {project.fundingSource}
          </Badge>
        </div>

        {/* Actors */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{t('project.keyActors')} ({project.actors &&project.actors.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            { project.actors && project.actors.slice(0, 3).map((actor, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {actor}
              </Badge>
            ))}
            {project.actors && project.actors.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.actors && project.actors.length - 3} {t('project.more')}
              </Badge>
            )}
          </div>
        </div>

        {/* Programs */}
        {project.programs && project.programs.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">{t('project.programs')}</div>
            <div className="flex flex-wrap gap-1">
              {project.programs && project.programs.slice(0, 2).map((program, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-accent/30">
                  {program}
                </Badge>
              ))}
              {project.programs && project.programs.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{project.programs && project.programs.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 border-t border-border">
          <Link
          href ={`/project/${project.id}`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
        >
            {t('project.viewDetails')}
            <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;