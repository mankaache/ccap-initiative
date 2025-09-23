'use client'

import CameroonMap from '@/components/map/CameroonMap'
import { fetchAllProjects } from '@/firebase/services/projectService';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export interface Project {
    id: string;
  organizationName: string;
  ProjectTitle: string;
  projectDescription: string;
  orgdescription: string;
  status: string; // "accepted" | "pending" | "rejected"
  specificLocation: string;
  region: string[];
  images?: File[];
  startDate: string;
  endDate: string;
  fundingSource: string;
  budgetAmount: string;
  specificObjectives: [];
  interventionLogic: string;
  programs: string[];
  partners: string[];
  category: string;
  subcategory?: string | null;
  projectType: string;
}

const MapComp = () => {

     const [loading, setLoading] = useState(true);
     const [projects, setProjects] = useState< Project[]>([]);
    
      useEffect(() => {
        const loadArticles = async () => {
          try {
            setLoading(true);
            const allArticles = await fetchAllProjects();
            //@ts-ignore
            setProjects(allArticles as Project[]);
            console.log('allArticles', allArticles);
          } catch (err) {
            console.error(err);
            toast.error("Failed to fetch articles");
          } finally {
            setLoading(false);
          }
        };
    
        loadArticles();
      }, []);


  
    return (
    <div>
        <CameroonMap projects={projects as any} />
    </div>
  )
}

export default MapComp