'use client'
import ProjectsList from "@/components/page-segments/admin/projects/ProjectList"
import { fetchAllOrganisations, fetchProjectsByOrganisationId } from "@/firebase/services/projectService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface OrganisationWithProjects {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  projects: any[];
}

const ProjectsPage = () => {


  return (
    <div><ProjectsList/></div>
  )
}

export default ProjectsPage