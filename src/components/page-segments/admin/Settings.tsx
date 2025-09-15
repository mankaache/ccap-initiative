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
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContexta';

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    projectUpdates: true,
    systemAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    currency: 'XAF',
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
  });

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    toast.success("Settings saved",{
      
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
    toast.success( "Settings saved",{
      
      description: "Your general preferences have been updated.",
    });
  };

  const handleSaveSecurity = () => {
    console.log('Saving security:', security);
    toast.success("Settings saved",{ 
      description: "Your security settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <span>Settings</span>
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
      

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>General Preferences</span>
              </CardTitle>
              <CardDescription>
                Configure your general application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={preferences.language}
                    onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>



              </div>

              <Button onClick={handleSavePreferences} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

       

      
      </Tabs>
    </div>
  );
}