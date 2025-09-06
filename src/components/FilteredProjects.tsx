'use client';

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";

// Mock project data - replace with your actual data source
const mockProjects = [
  {
    id: "1",
    title: "Climate Resilience Project",
    description: "Building climate resilience in coastal communities through mangrove restoration and sustainable fishing practices.",
    status: "ongoing",
    budget: "$2.5M",
    fundingSource: "World Bank",
    location: "Douala",
    region: "Littoral Region",
    actors: ["MINEPDED", "Local Communities", "WWF"],
    startDate: "2023-01-15",
    category: "adaptation",
    programs: ["Coastal Protection", "Sustainable Fisheries"]
  },
  {
    id: "2",
    title: "Solar Energy Initiative",
    description: "Installing solar panels in rural communities to provide clean energy and reduce carbon emissions.",
    status: "completed",
    budget: "$1.8M",
    fundingSource: "Green Climate Fund",
    location: "Bamenda",
    region: "Northwest Region",
    actors: ["Private Sector", "Research Institutions", "MINEPDED"],
    startDate: "2022-06-01",
    endDate: "2023-12-15",
    category: "mitigation",
    programs: ["Renewable Energy", "Rural Development"]
  },
  {
    id: "3",
    title: "Forest Conservation Program",
    description: "Protecting endangered forest areas and promoting sustainable forestry practices.",
    status: "planned",
    budget: "$3.2M",
    fundingSource: "Global Environment Facility",
    location: "Yaoundé",
    region: "Centre Region",
    actors: ["NGOs", "Local Communities", "Research Institutions"],
    startDate: "2024-03-01",
    category: "forestry",
    programs: ["Forest Conservation", "Biodiversity"]
  },
  {
    id: "4",
    title: "REDD+ Implementation",
    description: "Reducing emissions from deforestation and forest degradation through community-based approaches.",
    status: "ongoing",
    budget: "$4.1M",
    fundingSource: "World Bank",
    location: "Ebolowa",
    region: "South Region",
    actors: ["MINEPDED", "NGOs", "Local Communities"],
    startDate: "2023-08-10",
    category: "redd",
    programs: ["Carbon Sequestration", "Community Forestry"]
  },
  {
    id: "5",
    title: "Urban Green Infrastructure",
    description: "Developing green spaces and sustainable urban infrastructure in major cities.",
    status: "ongoing",
    budget: "$2.9M",
    fundingSource: "European Union",
    location: "Douala",
    region: "Littoral Region",
    actors: ["Private Sector", "Government of Cameroon", "MINEPDED"],
    startDate: "2023-03-20",
    category: "mitigation",
    programs: ["Urban Planning", "Green Infrastructure"]
  },
  {
    id: "6",
    title: "Climate Smart Agriculture",
    description: "Promoting climate-resilient agricultural practices among smallholder farmers.",
    status: "planned",
    budget: "$1.5M",
    fundingSource: "African Development Bank",
    location: "Bafoussam",
    region: "West Region",
    actors: ["Research Institutions", "Local Communities", "NGOs"],
    startDate: "2024-06-01",
    category: "adaptation",
    programs: ["Sustainable Agriculture", "Food Security"]
  }
];

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