// types/categories.ts
export interface Category {
  slug: string;
  name: string;
  description?: string;
  hasSubcategories: boolean;
  subcategories?: Array<{
    slug: string;
    name: string;
  }>;
}

export const CATEGORIES_CONFIG: Record<string, Category> = {
  etatiques: {
    slug: 'etatiques',
    name: 'Etatiques',
    description: '',
    hasSubcategories: true,
    subcategories: [
      { slug: 'ministères', name: 'Ministères' },
      { slug: 'structure', name: 'Structure' },
    ]
  },
  ongi: {
    slug: 'ongi',
    name: 'ONGI',
    description: '',
    hasSubcategories: false,

  },
  commune: {
    slug: 'commune',
    name: 'COMMUNE',
    description: '',
    hasSubcategories: false,

  },
  osc: {
    slug: 'osc',
    name: 'OSC',
    description: '',
    hasSubcategories: false
  },
  obc: {
    slug: 'obc',
    name: 'OBC',
    hasSubcategories: false
  },
  'secteur-privee': {
    slug: 'secteur-privee',
    name: 'SECTEUR PRIVEE',
    hasSubcategories: false,

  },
  cl: {
    slug: 'cl',
    name: 'CL',
    hasSubcategories: false
  }
};