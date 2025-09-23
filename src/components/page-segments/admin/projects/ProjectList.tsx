'use client';

import { use, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Briefcase, Calendar, MapPin, DollarSign, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchAllProjects } from '@/firebase/services/projectService';
import { toast } from 'react-toastify';
import ProjectCard from '@/components/ProjectCard';
import FullPageLoader from '@/components/layout/FullPageLoader';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProjectsList() {
  const navigate = useRouter();
  const {t} = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProjects();
        setProjects(data as any);
      } catch (err) {
        console.error(err);
        console.error("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;

    const term = searchTerm.toLowerCase();
    return projects.filter((project: any) =>
      project.ProjectTitle.toLowerCase().includes(term) ||
      project.fundingSource.toLowerCase().includes(term) ||
      project.organizationName.toLowerCase().includes(term)
    );
  }, [projects, searchTerm]);



   if (loading) {
          return (
            <div className="min-h-screen">
      
              <FullPageLoader/>
            </div>
          );
        }
 

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.project.project')}</h1>
          <p className="text-muted-foreground">{t('admin.project.desc')}</p>
        </div>
        <Button
          onClick={() => navigate.push('/admin/projects/create')}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('admin.project.create')}
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t('admin.project.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredProjects.length} {t('admin.project.projects')} {filteredProjects.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects?.map((project:any) => (
          <Card key={project.id} className="hover:shadow-medium transition-smooth">
          <ProjectCard
            project={project}
            category={project.category}
            subcategory={project.subcategory}
            id={project.organizationId} 
          />
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('admin.project.notFound')}</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? `${t('admin.articles.adjustSearch')}` : t('admin.project.adjustSearchOr') }
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate.push('/admin/projects/create')}>
              <Plus className="w-4 h-4 mr-2" />
              {t('admin.project.create')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}