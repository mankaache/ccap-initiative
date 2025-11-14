
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Briefcase,
  Plus,
  Shield,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  // const { user } = useAuth();
const {t} = useTranslation()
  const pathname = usePathname();
  const adminNavItems = [
    { icon: LayoutDashboard, label: `${t('auth.sidebar.dashboard')}`, href: '/admin/dashboard' },
    // { icon: Users, label: 'Actors', href: '/admin/actors' },
    { icon: FileText, label: `${t('auth.sidebar.articles')}`, href: '/admin/articles' },
    { icon: FolderOpen, label: `${t('auth.sidebar.documents')}`, href: '/admin/documents' },
    { icon: Briefcase, label: `${t('auth.sidebar.actors')}`, href: '/admin/actors' },
  
    { icon: Briefcase, label: `${t('auth.sidebar.projects')}`, href: '/admin/projects' },
    { icon: Briefcase, label: `${t('auth.sidebar.underReview')}`, href: '/admin/under-review'},
    { icon: Briefcase, label: `${t('auth.sidebar.underReviewArticles')}`, href: '/admin/article-review'},
    { icon: Briefcase, label: `${t('auth.sidebar.underReviewDocuments')}`, href: '/admin/doc-review'},
  ];


  const createItems = [
    // { icon: Users, label: 'Create Actor', href: '/admin/actors/create' },
    { icon: FileText, label: `${t('auth.sidebar.createArticle')}`, href: '/admin/articles/create' },
    { icon: FolderOpen, label: `${t('auth.sidebar.createDocument')}`, href: '/admin/documents/create' },
    { icon: Briefcase, label: `${t('auth.sidebar.createProject')}`, href: '/admin/projects/create' },
  ] 

  // const navItems = user?.role === 'admin' ? adminNavItems : actorNavItems;

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 shadow-medium transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-lg">{t('auth.sidebar.dashboard')}</h1>
              <p className="text-xs text-muted-foreground">
                {/* {user?.role === 'admin' ? 'Admin Panel' : 'Actor Portal'} */}
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {/* Main Navigation */}
        <div className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
                return(
            <Link
              key={item.href}
              href={item.href}
              className={
                cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-smooth text-sm font-medium",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-soft"
                    : "text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
              {isOpen && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          )})}
        </div>

        {/* Create Section */}
        {isOpen && (
          <div className="pt-6">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('auth.sidebar.createSection')}
            </div>
            <div className="space-y-1">
              {createItems.map((item) => {
                const isActive = pathname === item.href;

                return(
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth text-sm",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )
                  }
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )})}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}