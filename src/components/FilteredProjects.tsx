"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import FilterBar from "./FilterBar";
import ProjectsGrid from "./ProjectsGrid";
import {
  fetchAcceptedProjects,
  ProjectInput,
} from "@/firebase/services/projectService";
import FullPageLoader from "./layout/FullPageLoader";

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
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    projectType: [],
    categories: [],
    funding: [],
    regions: [],
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const accepted = await fetchAcceptedProjects();
        setProjects(accepted);
        console.log("acceptedProjects", accepted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // 🔹 Extract unique values for dropdowns
  const filterCategories = useMemo(() => {
    const projectTypes = [...new Set(projects.map((p) => p.projectType))];
    const categories = [...new Set(projects.map((p) => p.category))];
    const fundingSources = [...new Set(projects.map((p) => p.fundingSource))];
    const regions = [
      ...new Set(projects.flatMap((p) => p.region || [])), // flatten array
    ];

    return {
      projectTypes,
      categories,
      fundingSources,
      regions,
    };
  }, [projects]);

  // 🔹 Apply active filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Project Type
      if (
        activeFilters.projectType.length > 0 &&
        !activeFilters.projectType.includes(project.projectType)
      ) {
        return false;
      }

      // Category
      if (
        activeFilters.categories.length > 0 &&
        !activeFilters.categories.includes(project.category)
      ) {
        return false;
      }

      // Funding
      if (
        activeFilters.funding.length > 0 &&
        !activeFilters.funding.some((fund) =>
          project.fundingSource
            .toLowerCase()
            .includes(fund.toLowerCase().replace(/-/g, " "))
        )
      ) {
        return false;
      }

      // Region (check against array of regions for each project)
      if (
        activeFilters.regions.length > 0 &&
        !project.region.some((r) =>
          activeFilters.regions.includes(r.toLowerCase().replace(/\s+/g, "-"))
        )
      ) {
        return false;
      }

      return true;
    });
  }, [projects, activeFilters]);

  return (
    <div className="min-h-screen bg-background">
      <FilterBar
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        options={filterCategories}
      />

      {loading ? (
        <div className="min-h-screen">
          <FullPageLoader />
        </div>
      ) : (
        <ProjectsGrid projects={filteredProjects} />
      )}
    </div>
  );
};

export default ProjectsPage;
