'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  FileText,
  Briefcase,
  FolderOpen,
  TrendingUp,
  Calendar,
  Clock,
  Target,
} from 'lucide-react'
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContexta';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useRouter();

  const adminStats = [
    { label: 'Total Users', value: '12', icon: Users, color: 'text-primary' },
    { label: 'Articles Published', value: '48', icon: FileText, color: 'text-secondary' },
    { label: 'Active Projects', value: '6', icon: Briefcase, color: 'text-info' },
    { label: 'Documents', value: '24', icon: FolderOpen, color: 'text-warning' },
  ];

  const actorStats = [
    { label: 'My Articles', value: '8', icon: FileText, color: 'text-primary' },
    { label: 'My Projects', value: '3', icon: Briefcase, color: 'text-secondary' },
    { label: 'This Month', value: '2', icon: Calendar, color: 'text-info' },
    { label: 'In Progress', value: '1', icon: Clock, color: 'text-warning' },
  ];

  const stats = user?.role === 'admin' ? adminStats : actorStats;

  const recentActivities = [
    { action: 'New article published', user: 'GU Group', time: '2 hours ago', type: 'article' },
    { action: 'Project updated', user: 'SU Group', time: '4 hours ago', type: 'project' },
    { action: 'Document uploaded', user: 'Admin', time: '1 day ago', type: 'document' },
    { action: 'New actor created', user: 'Admin', time: '2 days ago', type: 'actor' },
  ];

  const quickActions = user?.role === 'admin' ? [
    { label: 'Create Actor', href: '/dashboard/actors/create', icon: Users },
    { label: 'Add Article', href: '/dashboard/articles/create', icon: FileText },
    { label: 'Upload Document', href: '/dashboard/documents/create', icon: FolderOpen },
    { label: 'New Project', href: '/dashboard/projects/create', icon: Briefcase },
  ] : [
    { label: 'Add Article', href: '/dashboard/articles/create', icon: FileText },
    { label: 'New Project', href: '/dashboard/projects/create', icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-white/80">
          {user?.role === 'admin' 
            ? 'Manage your organizational dashboard and oversee all activities.' 
            : 'Track your contributions and manage your projects.'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => navigate.push(action.href)}
              >
                <action.icon className="w-5 h-5 mr-3" />
                <span>{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {activity.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Admin Stats */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>User engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Active Users</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Content Created</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Project Completion</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transparency Score</CardTitle>
              <CardDescription>Projects reviewed for transparency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-secondary">89%</div>
                <p className="text-muted-foreground">of projects reviewed</p>
                <Badge className="bg-secondary/10 text-secondary">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}