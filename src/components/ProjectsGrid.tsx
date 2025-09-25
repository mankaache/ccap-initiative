import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ProjectInput } from "@/firebase/services/projectService";

interface ProjectsGridProps {
  
  projects: ProjectInput[] ;
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useTranslation();
  
  if (projects.length === 0) {
    return (
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {t('common.noResults')}
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            {t('common.clearFilters')}
          </Button>
        </div>
      </div>
    );
  }
  

  



  return (
    <section className="py-16">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">

        {/* Projects Grid/List */}

         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('projects.sectiontitle')}
          </h2>
          <p className="text-muted-foreground">
            {t('projects.showing')} {projects.length} {t('projects.results')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-10 w-10"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-10 w-10"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      
      </div> 
      <div className="flex gap-2 mb-8 flex-wrap justify-end">
            <Badge variant="outline" className="status-ongoing">
              {projects.filter(p => p.status === "ongoing").length} {t('projects.ongoing')}
            </Badge>
            <Badge variant="outline" className="status-completed">
              {projects.filter(p => p.status === "completed").length} {t('projects.completed')}
            </Badge>
            <Badge variant="outline" className="status-planned">
              {projects.filter(p => p.status === "planned").length} {t('projects.planned')}
            </Badge>
          </div>

      
        
        <div className={
          viewMode === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {projects.map((project) => (
            //@ts-ignore
            <div key={project.id} className="animate-fade-in">
              <ProjectCard
               project={project} />
            </div>
          ))}
        </div>

       

        {/* Load More */}
        {/* <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="min-w-[200px]">
            {t('projects.loadMore')}
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsGrid;