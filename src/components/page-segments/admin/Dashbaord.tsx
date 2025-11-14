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
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/useAuth';
import { useEffect, useState } from 'react';
import { fetchAllArticles, fetchAllDocuments } from '@/firebase/services/adminService';
import { toast } from 'sonner';
import { fetchAllProjects } from '@/firebase/services/projectService';
import { useTranslation } from '@/hooks/useTranslation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export default function Dashboard() {
  // const { user } = useAuth();
  const navigate = useRouter();

   const [loading, setLoading] = useState(true);
   const[articles, setArticles] = useState([]);
   const[projects, setProjects] = useState([]);
   const [documents, setDocuments] = useState([]);
   const [count, setCount] = useState(0);
  
    useEffect(() => {
      const loadArticles = async () => {
        try {
          setLoading(true);
          const allArticles = await fetchAllArticles();
          const allProjects = await fetchAllProjects();
          const allDocuments = await fetchAllDocuments();
          setArticles(allArticles as any);
          setProjects(allProjects as any);
          setDocuments(allDocuments as any);
        } catch (err) {
          console.error('Failed to fetch',err);
        
        } finally {
          setLoading(false);
        }
      };
  
      loadArticles();
    }, []);

     useEffect(() => {
    const fetchUserCount = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      setCount(usersSnapshot.size);
    };

    fetchUserCount();
  }, []);

    const {t} = useTranslation();

  const adminStats = [
    // { label:  `${t('admin.dashboard.totalUSers')}`, value:'12' , icon: Users, color: 'text-primary' },
    { label: `${t('admin.dashboard.totalUsers')}`, value: count, icon: Users, color: 'text-warning' },
    { label: `${t('admin.dashboard.totalProjects')}`, value: projects.length, icon: FileText, color: 'text-secondary' },
    { label: `${t('admin.dashboard.totalArticles')}`, value: articles.length, icon: Briefcase, color: 'text-info' },
    { label: `${t('admin.dashboard.totalDocuments')}`, value: documents.length, icon: FolderOpen, color: 'text-warning' },
  ];

 
  
 
  const quickActions =[
    // { label: 'Create Actor', href: '/dashboard/actors/create', icon: Users },
    { label: `${t('admin.dashboard.addArticles')}`, href: '/dashboard/articles/create', icon: FileText },
    { label: `${t('admin.dashboard.addDocuments')}`, href: '/dashboard/documents/create', icon: FolderOpen },
    { label: `${t('admin.dashboard.addProjects')}`, href: '/dashboard/projects/create', icon: Briefcase },
  ] 
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <h1 className="text-3xl capitalize font-bold mb-2">
          {t('admin.dashboard.welcome')}, 
          {user?.firstName}!
        </h1>
        <p className="text-white/80">
          {t('admin.dashboard.desc')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          loading && (
            <div className="col-span-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          )
        }
        {adminStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>{t('admin.dashboard.quickActions')}</span>
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
        {/* <Card className="lg:col-span-2">
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
        </Card> */}
      </div>

      {/* Additional Admin Stats */}
    
    </div>
  );
}

