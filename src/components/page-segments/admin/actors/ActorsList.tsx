'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Shield, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchAllOrganisations } from '@/firebase/services/projectService';
import { toast } from 'react-toastify';
import OrganizationCard from '@/components/OrganizationCard';
import FullPageLoader from '@/components/layout/FullPageLoader';
import { useTranslation } from '@/hooks/useTranslation';

export default function ActorsList() {
  const navigate = useRouter();
const { t } = useTranslation();
  const [orga, setOrga] = useState([]);
  const [loading, setLoading] = useState(false);

  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const data = await fetchAllOrganisations();
          setOrga(data as any);
          console.log('orga', data);
        } catch (err) {
          console.error(err);
          console.error("Failed to load projects.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
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
          <h1 className="text-3xl font-bold">{t('admin.project.actorTitle')}</h1>
          <p className="text-muted-foreground">{t('admin.project.actorDesc')}</p>
        </div>
        {/* <Button
          onClick={() => navigate.push('/admin/actors/create')}
          className="bg-gradient-tor from-primary to-primary/80 hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Actor
        </Button> */}
      </div>

      
        <Badge variant="outline">
          {orga?.length} {t('admin.project.actor')}{orga?.length !== 1 ? 's' : ''}
        </Badge>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orga?.map((organization:any) => (
           <OrganizationCard
              key={organization.id}
              organization={organization}
            />
        ))}
      </div>

      {orga.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('project.noOrg')}</h3>
        
         
            <Button onClick={() => navigate.push('/admin/projects/create')}>
              <Plus className="w-4 h-4 mr-2" />
                {t('admin.project.create')}
            </Button>
        
        </div>
      )}
    </div>
  );
}