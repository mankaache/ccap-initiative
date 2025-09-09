'use client';

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";
import { getMockProjects } from "@/data/mockProjects";

// Mock project data - replace with your actual data source


export interface Project {
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
}

interface FilterState {
  projects: string[];
  actors: string[];
  locations: string[];
  funding: string[];
}

const FilteredProjects = () => {
  const mockProjects =  getMockProjects();
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    projects: [],
    actors: [],
    locations: [],
    funding: []
  });

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // If no filters are active, show all projects
      const hasActiveFilters = Object.values(activeFilters).some(filters => filters.length > 0);
      if (!hasActiveFilters) return true;

      // Check project category filter
      if (activeFilters.projects.length > 0 && !activeFilters.projects.includes(project.category)) {
        return false;
      }

      // Check actors filter
      if (activeFilters.actors.length > 0) {
        const hasMatchingActor = project.actors.some(actor =>
          activeFilters.actors.some(filterActor => 
            actor.toLowerCase().includes(filterActor.toLowerCase())
          )
        );
        if (!hasMatchingActor) return false;
      }

      // Check locations filter
      if (activeFilters.locations.length > 0 && !activeFilters.locations.includes(project.region.toLowerCase().replace(/\s+/g, '-'))) {
        return false;
      }

      // Check funding filter
      if (activeFilters.funding.length > 0) {
        const hasMatchingFunding = activeFilters.funding.some(funding =>
          project.fundingSource.toLowerCase().includes(funding.toLowerCase().replace(/-/g, ' '))
        );
        if (!hasMatchingFunding) return false;
      }

      return true;
    });
  }, [activeFilters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <FilterBar 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />
      <ProjectsGrid
      //@ts-expect-error error
      projects={filteredProjects} />
    </div>
  );
};

export default FilteredProjects;