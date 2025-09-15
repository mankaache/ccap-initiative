
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Shield, FileText, Briefcase, Calendar, ExternalLink } from 'lucide-react';
import {  useRouter } from 'next/router';

export default function ActorDetails() {
  const navigate = useRouter();

  const { id } = navigate.query;;

  // Mock data - in real app, fetch based on id
  const actor = {
    id: '1',
    name: 'GU Group',
    description: 'Government University group focused on educational development and research initiatives. The organization has been instrumental in advancing educational policies and implementing sustainable development programs across the region.',
    hasLoginAccess: true,
    createdAt: '2023-06-15',
    lastActive: '2024-01-15',
    projects: [
      {
        id: '1',
        title: 'Educational Technology Initiative',
        status: 'ongoing',
        startDate: '2024-01-01',
      },
      {
        id: '2',
        title: 'Rural Development Program',
        status: 'completed',
        startDate: '2023-08-01',
      },
    ],
    articles: [
      {
        id: '1',
        title: 'New Infrastructure Development Initiative',
        date: '2024-01-15',
        type: 'text',
      },
      {
        id: '2',
        title: 'Education Reform Proposal',
        date: '2024-01-10',
        type: 'pdf',
      },
    ],
    contact: {
      email: 'contact@gugroup.org',
      phone: '+237 123 456 789',
      website: 'https://gugroup.org',
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'ongoing':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/actors')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Actors
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actor Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">{actor.name}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Organization Details
                    </CardDescription>
                  </div>
                </div>
                {actor.hasLoginAccess && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    <Shield className="w-3 h-3 mr-1" />
                    Login Access
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {actor.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Created</h4>
                    <p className="text-muted-foreground">
                      {new Date(actor.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Last Active</h4>
                    <p className="text-muted-foreground">
                      {new Date(actor.lastActive).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2 text-muted-foreground">{actor.contact.email}</span>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2 text-muted-foreground">{actor.contact.phone}</span>
                </div>
                <div>
                  <span className="font-medium">Website:</span>
                  <a 
                    href={actor.contact.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-primary hover:underline inline-flex items-center"
                  >
                    {actor.contact.website}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics and Recent Activity */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{actor.projects.length}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{actor.articles.length}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Recent Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actor.projects.map((project) => (
                  <div key={project.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">{project.title}</h4>
                      <Badge className={getStatusColor(project.status)} variant="outline">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Recent Articles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actor.articles.map((article) => (
                  <div key={article.id} className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{article.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {article.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}