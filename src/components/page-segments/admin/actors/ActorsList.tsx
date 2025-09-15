'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Shield, Eye } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ActorsList() {
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const actors = [
    {
      id: '1',
      name: 'GU Group',
      description: 'Government University group focused on educational development and research initiatives.',
      hasLoginAccess: true,
      projects: 3,
      articles: 8,
    },
    {
      id: '2',
      name: 'SU Organization',
      description: 'State University organization working on community development and outreach programs.',
      hasLoginAccess: true,
      projects: 2,
      articles: 5,
    },
    {
      id: '3',
      name: 'Development Partners',
      description: 'International development partners supporting various infrastructure projects.',
      hasLoginAccess: false,
      projects: 4,
      articles: 0,
    },
    {
      id: '4',
      name: 'Local Community Leaders',
      description: 'Community-based organization representing local interests and traditional leadership.',
      hasLoginAccess: false,
      projects: 1,
      articles: 2,
    },
  ];

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actor.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Actors</h1>
          <p className="text-muted-foreground">Manage organizations and groups in the system</p>
        </div>
        <Button
          onClick={() => navigate.push('/admin/actors/create')}
          className="bg-gradient-tor from-primary to-primary/80 hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Actor
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search actors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredActors.length} actor{filteredActors.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActors.map((actor) => (
          <Card key={actor.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{actor.name}</CardTitle>
                </div>
                {actor.hasLoginAccess && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    <Shield className="w-3 h-3 mr-1" />
                    Access
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {actor.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="font-semibold text-lg">{actor.projects}</div>
                    <div className="text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="font-semibold text-lg">{actor.articles}</div>
                    <div className="text-muted-foreground">Articles</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/actors/${actor.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No actors found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first actor.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate.push('/admin/actors/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Actor
            </Button>
          )}
        </div>
      )}
    </div>
  );
}