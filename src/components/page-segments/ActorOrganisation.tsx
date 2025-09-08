"use client";
import { ArrowLeft } from "lucide-react";

import { useParams } from "next/navigation";
import { getCategoryTitle, organizations } from "@/data/organisation";
import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { projects } from "@/data/mockData";

const ActorOrganisation = () => {
  const { category, id } = useParams<{ category: string; id: string }>();

  const organization = organizations.find(
    (org) => org.category === category && org.id === id
  );
  //@ts-ignore
  const categoryTitle = getCategoryTitle(organization.category);

  return (
    <div className="">
      <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 h-40 w-full">
        <div className="max-w-5xl mx-auto flex h-full items-center px-4">
          <Link
            href={`/actor/${organization && organization.category}`}
            className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-primary transition-fast mb-4"
          >
            <ArrowLeft className="h-7 w-7" />
            Back to {categoryTitle}
          </Link>
        </div>
      </div>

      <main className="min-h-screen max-w-5xl mx-auto  mt-5 px-4 lg:px-8 py-8">
        <div className="mb-8 ">
          <div className="mt-4 font-semibold text-muted-foreground">
           A Total of {projects.length} projects found
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 items-center">
          {projects.map((project) => (
            <div key={project.id} className="animate-fade-in">
              <ProjectCard
                //@ts-ignore
                project={project}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ActorOrganisation;
