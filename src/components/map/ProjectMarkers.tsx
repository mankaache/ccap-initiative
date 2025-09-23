import { useTranslation } from '@/hooks/useTranslation';
import React, { useEffect, useRef } from 'react';


const MapComponent = ({ projects, regionCoordinates, mapMode, onRegionClick, onViewDetails }:any) => {
  const mapRef = useRef(null);
  const {t} = useTranslation()
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const regionMarkersRef = useRef([]); // For region-specific markers
  const currentZoomedRegion = useRef(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initializeMap = async () => {
      if (typeof window === 'undefined' || mapInstanceRef.current || !mapRef.current) return;

      try {
        const L = (await import('leaflet')).default;
        
        // Clear any existing map instance on the container
        //@ts-ignore
        if (mapRef.current._leaflet_id) {
          // Clear any existing map instance on the container
          //@ts-ignore
          delete mapRef.current._leaflet_id;
        }
        
        // Initialize map with Cameroon boundaries and restrictions
        const map = L.map(mapRef.current, {
          center: [7.3697, 12.3547],
          zoom: 6,
          minZoom: 5,  // Prevent zooming out too far
          maxZoom: 16, // Allow detailed zoom
          zoomControl: true,
          attributionControl: true,
          // Restrict map bounds to Cameroon
          maxBounds: [
            [1.5, 8.0],   // Southwest corner (latitude, longitude)
            [13.5, 16.5]  // Northeast corner (latitude, longitude)
          ],
          maxBoundsViscosity: 1.0 // Makes the bounds "sticky"
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          bounds: [
            [1.5, 8.0],   // Southwest corner
            [13.5, 16.5]  // Northeast corner
          ]
        }).addTo(map);

        // Add zoom control explicitly (in case it's not showing)
        L.control.zoom({
          position: 'bottomright'
        }).addTo(map);

        // Custom marker icons
        const createMarkerIcon = (status:any) => {
          const colors:any = {
            accepted: '#10B981',
            pending: '#F59E0B',
            rejected: '#EF4444'
          };

          return L.divIcon({
            html: `
              <div style="
                background-color: ${colors[status] || '#6B7280'};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
        };

        // Add region polygons
        Object.entries(regionCoordinates).forEach(([name, data]:any) => {
          const size = 0.5;
          const bounds = [
            [data.lat - size, data.lng - size],
            [data.lat - size, data.lng + size],
            [data.lat + size, data.lng + size],
            [data.lat + size, data.lng - size]
          ];

          const polygon = L.polygon(bounds, {
            fillColor: data.color,
            fillOpacity: 0.1,
            color: data.color,
            weight: 2,
            opacity: 0.6
          }).addTo(map);

          polygon.on('click', () => {
            zoomToRegion(name, data);
            onRegionClick(name);
          });

          // Add region label
          L.marker([data.lat, data.lng], {
            icon: L.divIcon({
              html: `<div style="
                background: ${data.color};
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                white-space: nowrap;
              ">${name.charAt(0).toUpperCase() + name.slice(1)}</div>`,
              className: 'region-label',
              iconAnchor: [0, 0]
            })
          }).addTo(map);
        });
 
        //@ts-ignore
        mapInstanceRef.current = map;

        // Function to zoom to a specific region and show project locations
        //@ts-ignore
        const zoomToRegion = async (regionName, regionData) => {
          // Get projects in this region
          const regionProjects = projects.filter((project:any) => 
            project.region.some((r:any) => r.toLowerCase() === regionName.toLowerCase())
          );

          if (regionProjects.length === 0) return;

          // Clear existing region markers
          regionMarkersRef.current.forEach(marker => {
            map.removeLayer(marker);
          });
          regionMarkersRef.current = [];

          // Create bounds for the region projects
          //@ts-ignore
          const group = new L.featureGroup();

          // Add specific location markers for each project in the region
          regionProjects.forEach((project:any) => {
            // Check if project has specific locations with coordinates
            if (project.specificLocation && Array.isArray(project.specificLocation)) {
              project.specificLocation.forEach((location: any) => {
                if (location.lat && location.lng) {
                  // Create a more specific location marker (red dot as requested)
                  const specificLocationIcon = L.divIcon({
                    html: `
                      <div style="
                        background-color: #EF4444;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
                        position: relative;
                        animation: pulse 2s infinite;
                      ">
                      </div>
                      <style>
                        @keyframes pulse {
                          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                        }
                      </style>
                    `,
                    className: 'specific-location-marker',
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                  });

                  const marker = L.marker([location.lat, location.lng], {
                    icon: specificLocationIcon
                  }).addTo(map);

                  // Enhanced popup for specific locations
                  const popupContent = `
                    <div style="min-width: 260px; font-family: system-ui, -apple-system, sans-serif;">
                      <div style="margin-bottom: 12px;">
                        <h4 style="font-weight: bold; font-size: 16px; color: #1f2937; margin-bottom: 4px;">${project.ProjectTitle}</h4>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                          <span style="color: #EF4444;">📍</span>
                          <span style="color: #4b5563; font-size: 14px; font-weight: 500;">${location.name || project.specificLocation}</span>
                        </div>
                        <span style="
                          padding: 3px 8px;
                          border-radius: 12px;
                          font-size: 11px;
                          font-weight: 500;
                          ${project.status === 'accepted' ? 'background-color: #dcfce7; color: #166534;' :
                            project.status === 'pending' ? 'background-color: #fef3c7; color: #92400e;' :
                            'background-color: #fee2e2; color: #991b1b;'}
                        ">
                          ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                      
                      <div style="margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                          <span style="color: #6b7280; font-size: 12px;">🏢</span>
                          <span style="color: #4b5563; font-size: 13px;">${project.organizationName}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                          <span style="color: #6b7280; font-size: 12px;">💰</span>
                          <span style="color: #4b5563; font-size: 13px;">${parseInt(project.budgetAmount).toLocaleString()}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                          <span style="color: #6b7280; font-size: 12px;">🎯</span>
                          <span style="color: #4b5563; font-size: 13px;">${project.category}</span>
                        </div>
                      </div>
                      
                      <div style="padding-top: 10px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #4b5563; font-size: 13px; margin-bottom: 10px; line-height: 1.4;">${project.projectDescription}</p>
                        
                      </div>
                    </div>
                  `;

                  marker.bindPopup(popupContent, {
                    maxWidth: 280,
                    className: 'specific-location-popup'
                  });

                  group.addLayer(marker);
                  //@ts-ignore
                  regionMarkersRef.current.push(marker);
                }
              });
            }
          });

          // Zoom to fit all project markers in the region
          if (group.getLayers().length > 0) {
            map.fitBounds(group.getBounds(), {
              padding: [20, 20],
              maxZoom: 11
            });
          } else {
            // If no specific locations with coordinates, center on region
            map.setView([regionData.lat, regionData.lng], 10);
          }

          currentZoomedRegion.current = regionName;

          // Add a "Back to Cameroon" button
          //@ts-ignore
          const backButton = L.control({ position: 'topright' });
          backButton.onAdd = function() {
            const div = L.DomUtil.create('div', 'back-to-cameroon');
            div.innerHTML = `
              <button style="
                background-color: #374151;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='#1F2937'" onmouseout="this.style.backgroundColor='#374151'">
                ← Back to Cameroon
              </button>
            `;
            
            div.onclick = function() {
              // Reset to full Cameroon view
              map.setView([7.3697, 12.3547], 6);
              
              // Clear region-specific markers
              regionMarkersRef.current.forEach(marker => {
                map.removeLayer(marker);
              });
              regionMarkersRef.current = [];
              
              // Remove this control
              map.removeControl(backButton);
              currentZoomedRegion.current = null;
            };
            
            return div;
          };
          
          backButton.addTo(map);
        };
        //@ts-ignore
        // Expose the function for external use
        map.zoomToRegion = zoomToRegion;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          // Clear all markers
          markersRef.current.forEach(marker => {
            //@ts-ignore
            mapInstanceRef.current.removeLayer(marker);
          });
          regionMarkersRef.current.forEach(marker => {
            //@ts-ignore
            mapInstanceRef.current.removeLayer(marker);
          });
          //@ts-ignore
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          markersRef.current = [];
          regionMarkersRef.current = [];
          currentZoomedRegion.current = null;
          
          // Clear the leaflet id from the container
          if (mapRef.current) {
            //@ts-ignore
            delete mapRef.current._leaflet_id;
          }
        } catch (error) {
          console.log('Map cleanup error (this is normal in development):', error);
        }
      }
    };
  }, []);

  // Update markers when projects change
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === 'undefined') return;

    const updateMarkers = async () => {
      try {
        const L = (await import('leaflet')).default;
        
        // Clear existing markers
        markersRef.current.forEach(marker => {
          //@ts-ignore
          mapInstanceRef.current.removeLayer(marker);
        });
        markersRef.current = [];

        // Create marker icon function
        const createMarkerIcon = (status:any) => {
          const colors:any = {
            accepted: '#10B981',
            pending: '#F59E0B',
            rejected: '#EF4444'
          };

          return L.divIcon({
            html: `
              <div style="
                background-color: ${colors[status] || '#6B7280'};
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  background-color: white;
                  border-radius: 50%;
                "></div>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
        };

        if (mapMode === 'markers') {
          // Add project markers
          projects.forEach((project:any) => {
            // Check if project has specific locations with coordinates
            if (project.specificLocation && Array.isArray(project.specificLocation)) {
              project.specificLocation.forEach((location: any) => {
                if (location.lat && location.lng) {
                  const marker = L.marker([location.lat, location.lng], {
                    icon: createMarkerIcon(project.status)
                    //@ts-ignore
                  }).addTo(mapInstanceRef.current);

                  // Create popup content
                  const popupContent = `
                    <div style="min-width: 280px; max-width: 320px; font-family: system-ui, -apple-system, sans-serif;">
                      <div style="margin-bottom: 12px;">
                        <h3 style="font-weight: bold; font-size: 18px; color: #1f2937; margin-bottom: 4px;">${project.ProjectTitle}</h3>
                        <span style="
                          padding: 4px 8px;
                          border-radius: 12px;
                          font-size: 12px;
                          font-weight: 500;
                          ${project.status === 'accepted' ? 'background-color: #dcfce7; color: #166534;' :
                            project.status === 'pending' ? 'background-color: #fef3c7; color: #92400e;' :
                            'background-color: #fee2e2; color: #991b1b;'}
                        ">
                          ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                      
                      <div style="margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                          <span style="color: #6b7280;">🏢</span>
                          <span style="color: #4b5563; font-size: 14px;">${project.organizationName}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                          <span style="color: #6b7280;">📍</span>
                          <span style="color: #4b5563; font-size: 14px;">${location.name || project.specificLocation}</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                          <span style="color: #6b7280;">💰</span>
                          <span style="color: #4b5563; font-size: 14px;">${parseInt(project.budgetAmount).toLocaleString()}XAF</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                          <span style="color: #6b7280;">🎯</span>
                          <span style="color: #4b5563; font-size: 14px;">${project.category} • ${project.projectType}</span>
                        </div>
                      </div>
                      
                      <div style="padding-top: 12px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #4b5563; font-size: 14px; margin-bottom: 12px;">${project.projectDescription}</p>
                        
                      </div>
                    </div>
                  `;

                  marker.bindPopup(popupContent, {
                    maxWidth: 350,
                    className: 'custom-popup'
                  });

                  //@ts-ignore
                  markersRef.current.push(marker);
                }
              });
            }
          });
        } else if (mapMode === 'heatmap') {
          // Add circle markers for budget heatmap
          projects.forEach((project:any) => {
            if (project.specificLocation && Array.isArray(project.specificLocation)) {
              project.specificLocation.forEach((location: any) => {
                if (location.lat && location.lng) {
                  const radius = Math.sqrt(parseInt(project.budgetAmount)) / 200;
                  const circle = L.circleMarker([location.lat, location.lng], {
                    radius: radius,
                    fillColor: project.regionColor,
                    color: project.regionColor,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.4
                    //@ts-ignore
                  }).addTo(mapInstanceRef.current);

                  const popupContent = `
                    <div style="font-family: system-ui, -apple-system, sans-serif;">
                      <h4 style="margin: 0 0 8px 0; font-weight: bold;">${project.ProjectTitle}</h4>
                      <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${project.organizationName}</p>
                      <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">Location: ${location.name || project.specificLocation.name}</p>
                      <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">Budget: ${parseInt(project.budgetAmount).toLocaleString()}</p>
                      <p style="margin: 0; font-size: 12px; color: #888;">${project.category}</p>
                    </div>
                  `;

                  circle.bindPopup(popupContent);
                  //@ts-ignore
                  markersRef.current.push(circle);
                }
              });
            }
          });
        }
      } catch (error) {
        console.error('Error updating markers:', error);
      }
    };

    updateMarkers();
  }, [projects, mapMode]);

  return (
    <>
      {/* Ensure Leaflet CSS is loaded */}
      <style jsx global>{`
        .leaflet-control-zoom {
          border: 2px solid rgba(0,0,0,0.2) !important;
          border-radius: 4px !important;
          background: white !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }
        .leaflet-control-zoom a {
          background-color: white !important;
          border-bottom: 1px solid #ccc !important;
          color: black !important;
          font-weight: bold !important;
          text-decoration: none !important;
          font-size: 18px !important;
          line-height: 26px !important;
          width: 26px !important;
          height: 26px !important;
          display: block !important;
          text-align: center !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #f0f0f0 !important;
        }
        .leaflet-control-zoom-in {
          border-top-left-radius: 4px !important;
          border-top-right-radius: 4px !important;
        }
        .leaflet-control-zoom-out {
          border-bottom-left-radius: 4px !important;
          border-bottom-right-radius: 4px !important;
          border-bottom: none !important;
        }
        .leaflet-container {
          font: inherit !important;
        }
      `}</style>
      <div 
        ref={mapRef} 
        style={{ 
          height: '100%', 
          width: '100%',
          zIndex: 1
        }} 
      />
    </>
  );
};

export default MapComponent;