export type UserRole = 'admin' | 'actor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  actorId?: string;
}

export interface Actor {
  id: string;
  name: string;
  description: string;
  hasLoginAccess: boolean;
}

export interface Article {
  id: string;
  type: "text" | "pdf";
  content?: string | null;
  document?: string | null;
  title: string;
  date: string;
  image?: string;
  category: "national" | "regional";
  source: string;
  description: string;
  authorId: string;
}

export interface Document {
  id: string;
  category: "international" | "national" | "regulation";
  title: string;
  description: string;
  type: string;
  pages: number;
  dateOfCreation: string;
  contentPreview: string;
  author: string;
  language: string;
  authorId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed" | "planned";
  budget: string;
  fundingSource: string;
  location: string;
  region: string;
  actors: string[];
  startDate: string;
  endDate?: string;
  category: string;
  programs: string[];
  images?: string[];
  authorId: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalArticles: number;
  totalProjects: number;
  totalActors: number;
  transparencyChecked: number;
}