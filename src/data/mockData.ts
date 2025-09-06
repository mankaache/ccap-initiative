export interface FundingSource {
  id: string;
  name: string;
  type: 'government' | 'international' | 'private' | 'ngo';
  country: string;
  totalFunding: number;
}

export interface Actor {
  id: string;
  name: string;
  type: 'government' | 'ngo' | 'private' | 'international';
  role: string;
  location: string;
}

export interface Location {
  id: string;
  region: string;
  subdivision: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fundingSourceId: string;
  actorIds: string[];
  locationId: string;
  budget: number;
  startDate: string;
  endDate: string | null;
  status: 'ongoing' | 'completed' | 'planned';
  programs: string[];
  type: 'adaptation' | 'mitigation' | 'finance';
}

export const fundingSources: FundingSource[] = [
  {
    id: '1',
    name: 'Green Climate Fund',
    type: 'international',
    country: 'Global',
    totalFunding: 50000000,
  },
  {
    id: '2',
    name: 'World Bank',
    type: 'international',
    country: 'Global',
    totalFunding: 75000000,
  },
  {
    id: '3',
    name: 'Ministry of Environment',
    type: 'government',
    country: 'Cameroon',
    totalFunding: 25000000,
  },
  {
    id: '4',
    name: 'African Development Bank',
    type: 'international',
    country: 'Africa',
    totalFunding: 40000000,
  },
];

export const actors: Actor[] = [
  {
    id: '1',
    name: 'WWF Cameroon',
    type: 'ngo',
    role: 'Conservation Implementation',
    location: 'Yaoundé',
  },
  {
    id: '2',
    name: 'Ministry of Forestry',
    type: 'government',
    role: 'Policy Implementation',
    location: 'Yaoundé',
  },
  {
    id: '3',
    name: 'GIZ Cameroon',
    type: 'international',
    role: 'Technical Assistance',
    location: 'Douala',
  },
  {
    id: '4',
    name: 'Local Communities Union',
    type: 'ngo',
    role: 'Community Engagement',
    location: 'Bamenda',
  },
];

export const locations: Location[] = [
  {
    id: '1',
    region: 'Centre',
    subdivision: 'Yaoundé',
    coordinates: { lat: 3.848, lng: 11.502 },
  },
  {
    id: '2',
    region: 'Littoral',
    subdivision: 'Douala',
    coordinates: { lat: 4.0511, lng: 9.7679 },
  },
  {
    id: '3',
    region: 'Northwest',
    subdivision: 'Bamenda',
    coordinates: { lat: 5.9597, lng: 10.1463 },
  },
  {
    id: '4',
    region: 'East',
    subdivision: 'Bertoua',
    coordinates: { lat: 4.5767, lng: 13.6848 },
  },
  {
    id: '5',
    region: 'Far North',
    subdivision: 'Maroua',
    coordinates: { lat: 10.5911, lng: 14.3155 },
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Forest Conservation Initiative',
    description: 'Large-scale forest conservation project in the Congo Basin',
    fundingSourceId: '1',
    actorIds: ['1', '2'],
    locationId: '1',
    budget: 15000000,
    startDate: '2022-01-15',
    endDate: '2025-12-31',
    status: 'ongoing',
    programs: ['Forest Protection', 'Community Training', 'Biodiversity Monitoring'],
    type: 'adaptation',
  },
  {
    id: '2',
    title: 'Renewable Energy Infrastructure',
    description: 'Solar and wind energy installations in northern regions',
    fundingSourceId: '2',
    actorIds: ['3', '2'],
    locationId: '5',
    budget: 25000000,
    startDate: '2023-03-01',
    endDate: null,
    status: 'ongoing',
    programs: ['Solar Installation', 'Grid Connection', 'Maintenance Training'],
    type: 'mitigation',
  },
  {
    id: '3',
    title: 'Sustainable Agriculture Program',
    description: 'Climate-resilient farming techniques for smallholder farmers',
    fundingSourceId: '4',
    actorIds: ['4', '1'],
    locationId: '3',
    budget: 8000000,
    startDate: '2021-06-01',
    endDate: '2024-05-31',
    status: 'completed',
    programs: ['Farmer Training', 'Seed Distribution', 'Irrigation Systems'],
    type: 'adaptation',
  },
  {
    id: '4',
    title: 'Clean Water Access Initiative',
    description: 'Providing clean water access to rural communities',
    fundingSourceId: '3',
    actorIds: ['2', '4'],
    locationId: '4',
    budget: 12000000,
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    status: 'planned',
    programs: ['Well Construction', 'Water Treatment', 'Community Management'],
    type: 'adaptation',
  },
];