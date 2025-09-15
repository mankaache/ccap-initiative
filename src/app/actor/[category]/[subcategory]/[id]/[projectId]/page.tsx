'use client'


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getMockProjects } from '@/data/mockProjects';

import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Target,
  Building,
  FileText,
  Award,
  Lightbulb,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ProjectDetails = () => {
     const mockProjects = getMockProjects();
    const router = useRouter();
    const {projectId, id, category } = useParams()

    const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="max-w-5xl min-h-60 mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-red-500">
           Project not found
        </h2>
        <Link
          href={`/actor/${category}/${id}`}
          className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-primary mt-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back
            </Link>
      </div>
    );
  }
//   const mockProject = {
//     id: '1',
//     organizationName: 'Cameroon Climate Action Partnership',
//     organizationDescription: 'A leading environmental organization dedicated to implementing sustainable climate solutions across Cameroon, working with communities, government agencies, and international partners to build climate resilience.',
//     projectDescription: 'Implementation of renewable energy solutions in urban areas across Cameroon, focusing on solar and wind power installations for residential and commercial use. This comprehensive initiative aims to reduce carbon emissions while improving energy access and reliability.',
//     projectTitle: 'Sustainable Urban Energy Initiative',
//     specificLocation: 'Yaoundé Metropolitan Area, Centre Region',
//     region: ['Centre Region', 'Yaoundé', 'Soa', 'Obala'],
//     target: 'Provide clean energy access to 250,000 residents, reduce CO2 emissions by 45,000 tons annually, and create 1,200 green jobs in the renewable energy sector',
//     actors: ['Ministry of Energy and Water Resources', 'ENEO Cameroon', 'Green Energy Solutions Co.', 'Local Community Associations', 'Yaoundé Urban Council'],
//     startDate: '2023-01-15',
//     endDate: '2025-12-31',
//     fundingSource: 'World Bank Climate Investment Fund',
//     budgetAmount: '$15,200,000',
//     specificObjectives: [
//       'Install 50 MW of solar capacity across urban centers',
//       'Establish 25 community energy hubs',
//       'Train 500 local technicians in renewable energy maintenance',
//       'Develop sustainable financing mechanisms for energy access'
//     ],
//     interventionLogic: 'By installing renewable energy infrastructure and building local capacity, the project will create sustainable energy access while reducing dependence on fossil fuels and creating economic opportunities in the green energy sector.',
//     results: [
//       '15 MW solar capacity installed (30% of target achieved)',
//       '8 community energy hubs operational',
//       '150 technicians trained and certified',
//       '12,000 households connected to clean energy'
//     ],
//     goal: 'Transform Cameroon\'s urban energy landscape by establishing a sustainable, clean, and accessible energy ecosystem that serves as a model for Sub-Saharan Africa',
//     images: [
//       '/api/placeholder/400/300',
//       '/api/placeholder/400/300',
//       '/api/placeholder/400/300'
//     ],
//     organizationType: 'International Development Partnership',
//     programs: ['Clean Energy Access Program', 'Urban Development Initiative', 'SDG7 Implementation', 'Green Jobs Creation'],
//     isOngoing: true,
//     status: 'ongoing' as const,
//     category: 'Renewable Energy',
//     completionRate: 65
//   };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-ccap-orange/10 text-ccap-orange border-ccap-orange/20';
      case 'completed': return 'bg-ccap-green/10 text-ccap-green border-ccap-green/20';
      case 'planned': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Button onClick={() => router.back()} className="inline-flex border-none bg-transparent items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={`${getStatusColor(project && project.status)} border-white/20 bg-white/10`}>
                  {project && project.status.charAt(0).toUpperCase() + project && project.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {project && project.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {project && project.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-6 max-w-3xl">
                {project && project.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span>{project && project.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{project && project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span>{project && project.budget}</span>
                </div>
              </div>
            </div>
            
            {/* {project && project && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{mockProject.completionRate}%</div>
                  <div className="text-white/80 text-sm">Project Completion</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${mockProject.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Goal</h3>
                  <p className="text-muted-foreground"></p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Target</h3>
                  <p className="text-muted-foreground"></p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Intervention Logic</h3>
                  <p className="text-muted-foreground"></p>
                </div>
              </CardContent>
            </Card>

            {/* Specific Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Specific Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {/* {mockProject.specificObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ccap-green mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))} */}
                </ul>
              </CardContent>
            </Card>

            {/* Results & Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Results & Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {/* {[mockProject].results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-ccap-orange mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))} */}
                </ul>
              </CardContent>
            </Card>

            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  {/* <h3 className="font-semibold mb-2">{project && project.organization}</h3> */}
                  {/* <Badge variant="outline" className="mb-3">{mockProject.organizationType}</Badge> */}
                  {/* <p className="text-muted-foreground">{mockProject.organizationDescription}</p> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-medium">Start Date</div>
                    <div className="text-muted-foreground">{project.startDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-ccap-orange shrink-0" />
                  <div>
                    <div className="font-medium">End Date</div>
                    <div className="text-muted-foreground">{project.endDate}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="h-4 w-4 text-ccap-green shrink-0" />
                  <div>
                    <div className="font-medium">Budget</div>
                    <div className="text-muted-foreground">{project.budget}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Lightbulb className="h-4 w-4 text-blue-500 shrink-0" />
                  <div>
                    <div className="font-medium">Funding Source</div>
                    <div className="text-muted-foreground">{project.fundingSource}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium">Primary Location</div>
                  <div className="text-muted-foreground text-sm"></div>
                  
                  <div className="font-medium mt-4">Coverage Areas</div>
                  <div className="flex flex-wrap gap-1">
                    {/* {mockProject.region.map((area, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))} */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Actors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Key Actor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                      <span className="text-muted-foreground"></span>
                    </div>
                  )
                </div>
              </CardContent>
            </Card>

            {/* Related Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Related Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project && project.programs.map((program, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectDetails;