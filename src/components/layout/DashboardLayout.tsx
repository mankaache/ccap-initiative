'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import Link from 'next/link';

import { useAuth } from "@/firebase/useAuth";
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import FullPageLoader from './FullPageLoader';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'react-toastify';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 const {user, loading} = useAuth();
 const router= useRouter();
const {t} = useTranslation()
 
  useEffect(() => {
    // wait until auth loads
    if (!loading) {
      if (!user || user.role !== "admin") {
        // Not admin, redirect to home page
        router.push("/");
      }
    }
  }, [user, loading, router]);
  if (loading || !user) {
    return <FullPageLoader/>;
  }





  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const handleLogout = async () => {
    try {
    await signOut(auth);
    console.log(`${t('auth.signOutSuccess')}`);
    toast.success(`${t('auth.logoutSuccess')}`);
    localStorage.removeItem("userProfile");
   router.push('/auth/signin');
  } catch (error) {
    console.error(`${t('auth.signOutError')}`, error);
    toast.error(`${t('auth.logoutError')}`);
  }
};


  return (
    <>
    {
      user?.role === "admin" ? (
        <div className="min-h-screen bg-primary/5">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {/* Header */}
          <header className="bg-white border-b border-gray-200 shadow-soft h-16 flex items-center justify-between px-6">
            {/* <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 min-w-96">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-0 border-gray-200 focus:outline-none flex-1 text-sm"
                />
              </div>
            </div> */}

            <div className="flex items-center justify-end w-full space-x-4">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-secondary to-primary text-white font-semibold capitalize">
                        {user ? getInitials(user.firstName) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                      </div>
                    <div className="text-muted-foreground">
                      {user?.email}
                      </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-1 inline-block">
                      {user?.role}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem >
                    <Settings className="mr-2 h-4 w-4" />
                    <Link href="/admin/settings">{t("auth.settings")}</Link>
                    
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("common.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
      ): null
    }
    </>
  );
}