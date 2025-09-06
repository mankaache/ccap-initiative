import React from 'react';
import { ArrowLeft, Calendar, DollarSign, MapPin, Users, Target, CheckCircle, Clock, Building, Globe, FileText, TrendingUp } from 'lucide-react';
import { projects, fundingSources, actors, locations } from '../data/mockData';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';
import Link from 'next/link';


const ProjectDetail = () => {
  const param = useParams()
  const { id } = param
  const { t } = useTranslation();
  
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Projet non trouvé</h1>
          <Link href ="/" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const fundingSource = fundingSources.find(fs => fs.id === project.fundingSourceId);
  const location = locations.find(loc => loc.id === project.locationId);
  const projectActors = actors.filter(actor => project.actorIds.includes(actor.id));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'adaptation':
        return 'bg-blue-500';
      case 'mitigation':
        return 'bg-green-500';
      case 'finance':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Clock className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'planned':
        return <Target className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-orange-500 to-green-700 text-white py-16">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href ="/"
            className="inline-flex items-center text-white hover:text-green-100 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t('project.back_to_home')}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <span className={`inline-block w-4 h-4 rounded-full ${getTypeColor(project.type)} mr-3`}></span>
                <span className="text-green-100 text-sm font-medium uppercase tracking-wide">
                  {t(`project.type.${project.type}`)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-green-100 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="ml-2 font-medium">{t(`project.${project.status}`)}</span>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">{t('project.quick_stats')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-100">{t('project.budget')}:</span>
                  <span className="font-bold">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-100">{t('project.location')}:</span>
                  <span className="font-medium">{location?.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-100">{t('project.actors')}:</span>
                  <span className="font-medium">{projectActors.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 text-orange-500 mr-3" />
                {t('project.overview')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed mb-6">{project.description}</p>
                <p className="leading-relaxed">
                  Ce projet représente un effort significatif dans la lutte contre le changement climatique au Cameroun. 
                  Il vise à créer un impact durable sur les communautés locales tout en contribuant aux objectifs 
                  climatiques nationaux et internationaux.
                </p>
              </div>
            </section>

            {/* Programs and Activities */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-green-500 mr-3" />
                {t('project.programs')} et Activités
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.programs.map((program, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="font-medium text-gray-900">{program}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-3" />
                {t('project.timeline')}
              </h2>
              <div className="relative">
                <div className="absolute left-4 z-[1] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-green-500"></div>
                <div className="space-y-6 relative z-[2]">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-6">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('project.start_date')}</h3>
                      <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  
                  {project.status === 'ongoing' && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-6">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Actuellement en cours</h3>
                        <p className="text-gray-600">Le projet est activement mis en œuvre</p>
                      </div>
                    </div>
                  )}
                  
                  {project.endDate && (
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${project.status === 'completed' ? 'bg-blue-500' : 'bg-gray-400'} rounded-full flex items-center justify-center mr-6`}>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {project.status === 'completed' ? 'Projet terminé' : t('project.end_date')}
                        </h3>
                        <p className="text-gray-600">{new Date(project.endDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Impact and Results */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-purple-500 mr-3" />
                {t('project.impact_results')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2,500+</div>
                  <div className="text-gray-700">Bénéficiaires directs</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">15,000</div>
                  <div className="text-gray-700">Hectares protégés</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                  <div className="text-gray-700">Objectifs atteints</div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('project.details')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{t('project.budget')}</div>
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(project.budget)}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{t('project.location')}</div>
                    <div className="text-gray-700">{location?.region}, {location?.subdivision}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{t('project.funding_source')}</div>
                    <div className="text-gray-700">{fundingSource?.name}</div>
                    <div className="text-sm text-gray-500">{fundingSource?.type} • {fundingSource?.country}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Actors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-5 w-5 text-purple-500 mr-2" />
                {t('project.actors')} ({projectActors.length})
              </h3>
              <div className="space-y-4">
                {projectActors.map((actor) => (
                  <div key={actor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-1">{actor.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{actor.type}</p>
                    <p className="text-sm text-orange-600">{actor.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{actor.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Type Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 text-indigo-500 mr-2" />
                {t('project.type_info')}
              </h3>
              <div className={`p-4 rounded-lg ${getTypeColor(project.type)} bg-opacity-10 border-l-4 ${getTypeColor(project.type)}`}>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Projet de {t(`project.type.${project.type}`)}
                </h4>
                <p className="text-sm text-gray-700">
                  {project.type === 'adaptation' && 'Ce projet vise à renforcer la résilience face aux impacts du changement climatique.'}
                  {project.type === 'mitigation' && 'Ce projet contribue à la réduction des émissions de gaz à effet de serre.'}
                  {project.type === 'finance' && 'Ce projet facilite l\'accès au financement climatique pour d\'autres initiatives.'}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('project.contact')}</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900">Organisation principale</div>
                  <div className="text-gray-700">{projectActors[0]?.name}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email de contact</div>
                  <div className="text-orange-600">contact@ccap-cameroun.org</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Téléphone</div>
                  <div className="text-gray-700">+237 123 456 789</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('project.additional_info')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs de développement durable</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">ODD 13: Action climatique</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">ODD 15: Vie terrestre</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">ODD 1: Pas de pauvreté</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Secteurs d'intervention</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Gestion des ressources naturelles</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Développement communautaire</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">Renforcement des capacités</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;