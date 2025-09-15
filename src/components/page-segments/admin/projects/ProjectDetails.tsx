'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Briefcase, Calendar, MapPin, DollarSign, Users, Target, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProjectDetails() {
  const navigate = useRouter();
  const { id } = navigate.query;

  // Mock data - in real app, fetch based on id
  const project = {
    id: '1',
    title: 'Rural Water Supply Project',
    description: 'Installing clean water infrastructure in rural communities across the Northern Region. This comprehensive project aims to provide sustainable access to clean drinking water for over 50,000 residents in remote areas.',
    status: 'ongoing' as const,
    budget: '2,500,000 XAF',
    fundingSource: 'World Bank & Government Partnership',
    location: 'Northern Region',
    region: 'Far North',
    actors: ['GU Group', 'Development Partners', 'Local Communities', 'Water Ministry'],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    category: 'Infrastructure',
    programs: ['Water Access Initiative', 'Rural Development Program', 'Community Health Improvement'],
    progress: 65,
    createdAt: '2023-12-15',
    lastUpdated: '2024-01-15',
    
    // Additional details
    objectives: [
      'Install 15 new water wells with solar-powered pumps',
      'Construct 8 water treatment facilities',
      'Train 50 local technicians for maintenance',
      'Establish community water management committees',
      'Implement water quality monitoring systems'
    ],
    
    milestones: [
      {
        id: '1',
        title: 'Site Assessment and Planning',
        description: 'Complete geological surveys and community consultations',
        status: 'completed',
        completedAt: '2024-02-15',
        progress: 100
      },
      {
        id: '2',
        title: 'Equipment Procurement',
        description: 'Purchase and delivery of drilling equipment and pumps',
        status: 'completed',
        completedAt: '2024-03-30',
        progress: 100
      },
      {
        id: '3',
        title: 'Well Construction Phase 1',
        description: 'Drilling and installation of first 8 wells',
        status: 'ongoing',
        progress: 75
      },
      {
        id: '4',
        title: 'Treatment Facilities Construction',
        description: 'Building water treatment and storage facilities',
        status: 'ongoing',
        progress: 45
      },
      {
        id: '5',
        title: 'Community Training Program',
        description: 'Training local technicians and establishing management committees',
        status: 'planned',
        progress: 0
      }
    ],
    
    beneficiaries: {
      directBeneficiaries: 52000,
      communities: 25,
      households: 8500,
      schools: 12,
      healthCenters: 6
    },
    
    budget_breakdown: [
      { category: 'Equipment & Materials', amount: 1500000, percentage: 60 },
      { category: 'Labor & Construction', amount: 625000, percentage: 25 },
      { category: 'Training & Capacity Building', amount: 250000, percentage: 10 },
      { category: 'Project Management', amount: 125000, percentage: 5 }
    ]
  };

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

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'ongoing':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'planned':
        return <Target className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Target className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/projects')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {project.category} • {project.region}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Budget:</span>
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Duration:</span>
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Actors:</span>
                    <span>{project.actors.length} organizations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Project Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    {getMilestoneIcon(milestone.status)}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <Badge variant="outline" className={getStatusColor(milestone.status as 'ongoing' | 'completed' | 'planned')}>
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      {milestone.status !== 'planned' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-1" />
                        </div>
                      )}
                      {milestone.completedAt && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {project.beneficiaries.directBeneficiaries.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Direct Beneficiaries</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{project.beneficiaries.communities}</div>
                    <div className="text-xs text-muted-foreground">Communities</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{project.beneficiaries.households.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Households</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{project.beneficiaries.schools}</div>
                    <div className="text-xs text-muted-foreground">Schools</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{project.beneficiaries.healthCenters}</div>
                    <div className="text-xs text-muted-foreground">Health Centers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Source */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-sm">Source:</span>
                  <p className="text-sm text-muted-foreground mt-1">{project.fundingSource}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Total Budget:</span>
                  <p className="text-lg font-bold text-primary">{project.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participating Actors */}
          <Card>
            <CardHeader>
              <CardTitle>Participating Actors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.actors.map((actor) => (
                  <div key={actor} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{actor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programs */}
          <Card>
            <CardHeader>
              <CardTitle>Related Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.programs.map((program) => (
                  <Badge key={program} variant="outline" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}