'use client';
import React, { useState, useEffect, useMemo } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/hooks/useTranslation';


const MapComponent = dynamic(() => import('./ProjectMarkers'), {
  ssr: false,
  loading: () => {
    const {t} = useTranslation()
    return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('map.loadingProjects')}</p>
      </div>
    </div>
  )}
});




// Cameroon regions with coordinates
const regionCoordinates = {
  'centre': { lat: 3.848, lng: 11.502, color: '#10B981' },
  'littoral': { lat: 4.0511, lng: 9.7679, color: '#3B82F6' },
  'extrême nord': { lat: 10.5915, lng: 14.2073, color: '#F59E0B' },
 'nord': { lat: 9.3014, lng: 13.3970, color: '#EF4444' },
  ' nord-ouest': { lat: 6.2088, lng: 10.1500, color: '#8B5CF6' },
  'sud-ouest': { lat: 4.6125, lng: 9.2625, color: '#EC4899' },
  'ouest': { lat: 5.9631, lng: 10.1591, color: '#06B6D4' },
  'est': { lat: 4.9667, lng: 14.5333, color: '#84CC16' },
  'sud': { lat: 2.9167, lng: 11.5167, color: '#F97316' },
  'adamawa': { lat: 7.3667, lng: 12.4667, color: '#6366F1' }
};



const RegionInfoPanel = ({ region, projects, onClose }:any) => {
  const {t} = useTranslation()
    //@ts-ignore
  const regionData = regionCoordinates[region?.toLowerCase()];
  const regionProjects = projects.filter((  p:any) => 
    p.region.some((r:any) => r.toLowerCase() === region?.toLowerCase())
  );

  const totalBudget = regionProjects.reduce((sum:any, p:any) => sum + parseInt(p.budgetAmount), 0);
  const statusCounts = regionProjects.reduce((acc:any, p:any) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-2xl z-[1000] border border-gray-200">
      <div 
        className="p-4 rounded-t-xl text-white font-bold flex items-center justify-between"
        style={{ backgroundColor: regionData?.color || '#6B7280' }}
      >
        <h3 className="text-lg">{region?.charAt(0).toUpperCase() + region?.slice(1)} Region</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">
          ×
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{regionProjects.length}</div>
            <div className="text-sm text-blue-600">{t('map.project')}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">{totalBudget.toLocaleString()}XAF</div>
            <div className="text-sm text-green-600">{t('map.totalBudget')}</div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">{t('map.statusBreakdown')}</h4>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]:any) => (
              <div key={status} className="flex items-center justify-between">
                <span className="capitalize text-sm">{status}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  status === 'accepted' ? 'bg-green-100 text-green-800' :
                  status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">{t('map.recentProject')}</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {regionProjects.slice(0, 5).map((project:any) => (
              <div key={project.id} className="p-2 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">{project.ProjectTitle}</div>
                <div className="text-xs text-gray-600">{project.organizationName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CameroonMap = ({ projects  }:any) => {
  const {t} = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapMode, setMapMode] = useState('markers');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
 const [filteredProjects, setFilteredProjects] = useState([]);
  useEffect(() => {
    setIsMounted(true);
    
  }, []);

const processedProjects = useMemo(() => {
    return projects.map((project:any) => {
      // If project has specific locations with coordinates, use the first one
      if (project.specificLocation && Array.isArray(project.specificLocation) && project.specificLocation.length > 0) {
        const firstLocation = project.specificLocation[0];
        if (firstLocation.lat && firstLocation.lng) {
          const primaryRegion = project.region?.[0]?.toLowerCase() || '';
          //@ts-ignore
          const coords = regionCoordinates[primaryRegion];
          
          return {
            ...project,
            lat: firstLocation.lat,
            lng: firstLocation.lng,
            regionColor: coords?.color || '#6B7280'
          };
        }
      }
      
      // Fallback to region-based coordinates if no specific location coordinates
      const primaryRegion = project.region?.[0]?.toLowerCase() || '';
      //@ts-ignore
      const coords = regionCoordinates[primaryRegion];
      
      if (coords) {
        const latOffset = (Math.random() - 0.5) * 0.2;
        const lngOffset = (Math.random() - 0.5) * 0.2;
        
        return {
          ...project,
          lat: coords.lat + latOffset,
          lng: coords.lng + lngOffset,
          regionColor: coords.color
        };
      }
      
      return project;
    }).filter((p:any) => p.lat && p.lng);
  }, [projects]);


  // Update filtered projects when filters change
  useEffect(() => {
    let filtered = processedProjects;
    
    if (statusFilter !== 'all') {
      filtered = processedProjects.filter((p:any) => p.status === statusFilter);
    }
    //@ts-ignore
    setFilteredProjects(filtered);
  }, [processedProjects, statusFilter]);

  const handleViewDetails = (projectId:any) => {
    console.log('Navigate to project details:', projectId);
    // Implement navigation logic here
  };

  const handleRegionClick = (regionName:any) => {
    setSelectedRegion(regionName);
  };


  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('map.initialize')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Control Panel */}
      {/* <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg z-[1000] p-4 border border-gray-200">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">View Mode</label>
            <select 
              value={mapMode} 
              onChange={(e) => setMapMode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="markers">Project Markers</option>
              <option value="heatmap">Budget Heatmap</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status Filter</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <div className="text-sm font-medium mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Rejected</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Statistics Panel */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg z-[1000] px-6 py-3 border border-gray-200">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{filteredProjects.length}</div>
            <div className="text-xs text-gray-600">{t('map.activeProjects')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {filteredProjects.reduce((sum, p:any) => sum + parseInt(p.budgetAmount), 0).toLocaleString()} XAF
            </div>
            <div className="text-xs text-gray-600">{t('map.totalInvestment')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {new Set(filteredProjects.flatMap((p:any) => p.region)).size}
            </div>
            <div className="text-xs text-gray-600">{t('map.regionsCovered')}</div>
          </div>
        </div>
      </div>

      {/* Map Component */}
      <MapComponent
        projects={filteredProjects}
        regionCoordinates={regionCoordinates}
        mapMode={mapMode}
        onRegionClick={handleRegionClick}
        onViewDetails={handleViewDetails}
      />

      {/* Region Info Panel */}
      {selectedRegion && (
        <RegionInfoPanel
          region={selectedRegion}
          projects={projects}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
};

export default CameroonMap;