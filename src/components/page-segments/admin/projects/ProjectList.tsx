'use client';

import { use, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Briefcase, Calendar, MapPin, DollarSign, Eye } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProjectsList() {
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const projects = [
    {
      id: '1',
      title: 'Rural Water Supply Project',
      description: 'Installing clean water infrastructure in rural communities across the Northern Region.',
      status: 'ongoing' as const,
      budget: '2,500,000 XAF',
      location: 'Northern Region',
      actors: ['GU Group', 'Development Partners'],
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 65,
      category: 'Infrastructure',
    },
    {
      id: '2',
      title: 'Educational Technology Initiative',
      description: 'Providing digital learning tools and internet connectivity to schools.',
      status: 'planned' as const,
      budget: '1,800,000 XAF',
      location: 'Central Region',
      actors: ['SU Organization', 'Government Agency'],
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      progress: 0,
      category: 'Education',
    },
    {
      id: '3',
      title: 'Healthcare Mobile Clinic Program',
      description: 'Mobile healthcare services for remote communities.',
      status: 'completed' as const,
      budget: '3,200,000 XAF',
      location: 'Eastern Region',
      actors: ['Local Community', 'NGO Partners'],
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      progress: 100,
      category: 'Healthcare',
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: 'ongoing' | 'completed' | 'planned') => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'ongoing':
        return 'bg-warning/10 text-warning';
      case 'planned':
        return 'bg-info/10 text-info';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: 'ongoing' | 'completed' | 'planned') => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'ongoing':
        return '🔄';
      case 'planned':
        return '📋';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Track and manage organizational projects</p>
        </div>
        <Button
          onClick={() => navigate.push('/admin/projects/create')}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-lg">{getStatusIcon(project.status)}</span>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Actors involved:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.actors.slice(0, 2).map((actor) => (
                      <Badge key={actor} variant="outline" className="text-xs">
                        {actor}
                      </Badge>
                    ))}
                    {project.actors.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.actors.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/projects/${project.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first project.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate.push('/admin/projects/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Project
            </Button>
          )}
        </div>
      )}
    </div>
  );
}