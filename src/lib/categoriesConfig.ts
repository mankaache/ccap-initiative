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
      { slug: 'ministries', name: 'Ministries' },
      { slug: 'institions', name: 'Institutions' },
    ]
  },
  ongi: {
    slug: 'ongi',
    name: 'ONGI',
    description: '',
    hasSubcategories: true,
    subcategories: [
      { slug: 'international', name: 'International NGOs' },
      { slug: 'local', name: 'Local NGOs' },
    ]
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
    hasSubcategories: true,
    subcategories: [
      { slug: 'large', name: 'Large Private Enterprises' },
      { slug: 'sme', name: 'Small & Medium Enterprises' },
    ]
  },
  cl: {
    slug: 'cl',
    name: 'CL',
    hasSubcategories: false
  }
};