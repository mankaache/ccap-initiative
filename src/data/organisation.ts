export interface IOrganization {
  id: string;
  name: string;
  category: string;
  description: string;
  founded: string;
  location: string;
  website?: string;
  email?: string;
  phone?: string;
  services: string[];
  logo?: string;
}

export const organizations: IOrganization[] = [
  // etatiques
  {
    id: 'gohze',
    name: 'Gohze',
    category: 'etatiques',
    description: 'Leading strategic consulting firm specializing in digital transformation and organizational development.',
    founded: '2018',
    location: 'New York, NY',
    website: 'https://gohze.com',
    email: 'contact@gohze.com',
    phone: '+1 (555) 123-4567',
    services: ['Digital Strategy', 'Change Management', 'Process Optimization']
  },
  {
    id: 'stacy-co',
    name: 'Stacy & Co',
    category: 'etatiques',
    description: 'Premier business consulting firm focused on sustainable growth and innovation strategies.',
    founded: '2015',
    location: 'San Francisco, CA',
    website: 'https://stacyco.com',
    email: 'hello@stacyco.com',
    phone: '+1 (555) 234-5678',
    services: ['Strategy Consulting', 'Market Research', 'Innovation Management']
  },
  {
    id: 'lumin',
    name: 'Lumin',
    category: 'etatiques',
    description: 'Technology consulting company specializing in AI and data analytics solutions.',
    founded: '2020',
    location: 'Austin, TX',
    website: 'https://lumin.tech',
    email: 'info@lumin.tech',
    phone: '+1 (555) 345-6789',
    services: ['AI Implementation', 'Data Analytics', 'Cloud Solutions']
  },
  {
    id: 'gu-group',
    name: 'Gu Group',
    category: 'etatiques',
    description: 'International consulting firm providing comprehensive business solutions across multiple industries.',
    founded: '2012',
    location: 'London, UK',
    website: 'https://gugroup.com',
    email: 'contact@gugroup.com',
    phone: '+44 20 7123 4567',
    services: ['Management Consulting', 'Financial Advisory', 'Risk Assessment']
  },
  {
    id: 'shen-group',
    name: 'Shen Group',
    category: 'etatiques',
    description: 'Boutique consulting firm specializing in emerging markets and cross-cultural business strategies.',
    founded: '2017',
    location: 'Singapore',
    website: 'https://shengroup.sg',
    email: 'info@shengroup.sg',
    phone: '+65 6123 4567',
    services: ['Market Entry', 'Cultural Consulting', 'Partnership Development']
  },

  // ongi
  {
    id: 'green-future',
    name: 'Green Future Foundation',
    category: 'ongi',
    description: 'Environmental NGO dedicated to promoting sustainable practices and climate action.',
    founded: '2010',
    location: 'Seattle, WA',
    website: 'https://greenfuture.org',
    email: 'contact@greenfuture.org',
    phone: '+1 (555) 456-7890',
    services: ['Environmental Education', 'Climate Research', 'Community Outreach']
  },
  {
    id: 'hope-alliance',
    name: 'Hope Alliance',
    category: 'ongi',
    description: 'Non-profit organization focused on poverty alleviation and community development.',
    founded: '2008',
    location: 'Chicago, IL',
    website: 'https://hopealliance.org',
    email: 'help@hopealliance.org',
    phone: '+1 (555) 567-8901',
    services: ['Community Development', 'Food Security', 'Educational Programs']
  },
  {
    id: 'youth-empowerment',
    name: 'Youth Empowerment Network',
    category: 'ongi',
    description: 'Organization dedicated to empowering young people through education and skill development.',
    founded: '2014',
    location: 'Boston, MA',
    website: 'https://youthempowerment.org',
    email: 'info@youthempowerment.org',
    phone: '+1 (555) 678-9012',
    services: ['Youth Programs', 'Skills Training', 'Mentorship']
  },
  {
    id: 'global-health',
    name: 'Global Health Initiative',
    category: 'ongi',
    description: 'International NGO working to improve healthcare access in underserved communities.',
    founded: '2005',
    location: 'Geneva, Switzerland',
    website: 'https://globalhealthinit.org',
    email: 'contact@globalhealthinit.org',
    phone: '+41 22 123 4567',
    services: ['Healthcare Access', 'Medical Training', 'Health Research']
  },

  // osc
  {
    id: 'tech-innovators',
    name: 'Tech Innovators Collective',
    category: 'osc',
    description: 'Social good corporation developing technology solutions for humanitarian challenges.',
    founded: '2019',
    location: 'San Francisco, CA',
    website: 'https://techinnovators.org',
    email: 'hello@techinnovators.org',
    phone: '+1 (555) 789-0123',
    services: ['Tech for Good', 'Innovation Labs', 'Social Impact Consulting']
  },
  {
    id: 'sustainable-solutions',
    name: 'Sustainable Solutions Inc',
    category: 'osc',
    description: 'Corporation committed to developing sustainable business models and environmental solutions.',
    founded: '2016',
    location: 'Portland, OR',
    website: 'https://sustainablesolutions.com',
    email: 'info@sustainablesolutions.com',
    phone: '+1 (555) 890-1234',
    services: ['Sustainability Consulting', 'Green Technology', 'Environmental Solutions']
  },
  {
    id: 'social-impact-ventures',
    name: 'Social Impact Ventures',
    category: 'osc',
    description: 'Investment firm focused on funding and scaling social enterprises and impact-driven businesses.',
    founded: '2013',
    location: 'New York, NY',
    website: 'https://socialimpactventures.com',
    email: 'contact@socialimpactventures.com',
    phone: '+1 (555) 901-2345',
    services: ['Impact Investing', 'Business Development', 'Social Enterprise Support']
  },
  {
    id: 'community-builders',
    name: 'Community Builders Corp',
    category: 'osc',
    description: 'Social good corporation specializing in community development and urban planning.',
    founded: '2011',
    location: 'Denver, CO',
    website: 'https://communitybuilders.org',
    email: 'info@communitybuilders.org',
    phone: '+1 (555) 012-3456',
    services: ['Urban Planning', 'Community Development', 'Social Infrastructure']
  }
];

export const getCategoryTitle = (category: string): string => {
  switch (category) {
    case 'etatiques':
      return 'Etatiques';
    case 'ongi':
      return 'ONGI';
    case 'osc':
      return 'OSC';
    case 'obc':
      return 'OBC';
    case 'secteur-privee':
      return 'SECTEUR PRIVEE';
    case 'cl':
      return 'CL';
    default:
      return category;
  }
};

export const getCategoryDescription = (category: string): string => {
  switch (category) {
    case 'etatiques':
      return 'Professional consulting and strategic advisory firms';
    case 'ongi':
      return 'Non-governmental organizations working for social causes';
    case 'osc':
      return 'Social good corporations driving positive impact';
    default:
      return '';
  }
};