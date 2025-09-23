'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Settings as SettingsIcon,

  Globe,
} from 'lucide-react';
import DeleteUser from '@/components/DeleteButtons/DeleteUser';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Settings() {
  const { t } = useTranslation();


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <span>{t('admin.project.settings')}</span>
        </h1>
        <p className="text-muted-foreground">{t('admin.project.settingsDesc')}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
      

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>{t('admin.project.general')}</span>
              </CardTitle>
              <CardDescription>
                {t('admin.project.generalDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
             <LanguageSwitcher/>

             
              <DeleteUser/>
            </CardContent>
          </Card>
        </TabsContent>

       

      
      </Tabs>
    </div>
  );
}