"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Info, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

// Mock map component (will be replaced with actual Mapbox when token is provided)
const MapSection2 = () => {
  const { t } = useTranslation();
  
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");

  // Mock project data with coordinates
  const projects = [
    {
      id: 1,
      name: "Sustainable Forest Management",
      location: "East Region",
      coordinates: [13.5, 4.5],
      budget: "€15.2M",
      status: "Ongoing",
      completion: 65,
      actors: ["Ministry of Forestry", "WWF Cameroon"]
    },
    {
      id: 2,
      name: "Solar Energy Access",
      location: "North Region",
      coordinates: [13.0, 8.5],
      budget: "€8.7M", 
      status: "Ongoing",
      completion: 40,
      actors: ["ENEO", "Rural Development Ministry"]
    },
    {
      id: 3,
      name: "Climate-Smart Agriculture",
      location: "Northwest",
      coordinates: [10.5, 6.0],
      budget: "€12.5M",
      status: "Ongoing", 
      completion: 78,
      actors: ["MINADER", "IRAD"]
    },
    {
      id: 4,
      name: "Coastal Protection",
      location: "Littoral",
      coordinates: [9.7, 4.0],
      budget: "€22.1M",
      status: "Ongoing",
      completion: 25,
      actors: ["Ministry of Environment", "EU Delegation"]
    }
  ];

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      // Here you would initialize the actual Mapbox map
      console.log("Mapbox token provided:", mapboxToken);
      setShowTokenInput(false);
    }
  };

  return (
    <div className="w-full py-12 bg-muted/30">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('map.description')}
          </p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] relative overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-primary mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Interactive Cameroon Map</h3>
                    <p className="text-muted-foreground">To display the full interactive map with project locations:</p>
                    <Button 
                      onClick={() => setShowTokenInput(true)}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      Configure Map Integration
                    </Button>
                  </div>
                </div>

                {/* Mock Project Dots */}
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:w-6 hover:h-6 transition-all duration-200 flex items-center justify-center"
                    style={{
                      left: `${20 + (project.coordinates[0] - 8) * 15}%`,
                      top: `${60 - (project.coordinates[1] - 2) * 20}%`,
                    }}
                    //@ts-ignore
                    onClick={() => setSelectedProject(project)}
                    title={project.name}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ))}
              </div>

              {/* Token Input Modal */}
              {showTokenInput && (
                <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center p-6">
                  <div className="bg-card border rounded-lg p-6 max-w-md w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Mapbox Configuration</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowTokenInput(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get your free Mapbox public token at{" "}
                      <a href="https://mapbox.com" target="_blank" className="text-primary hover:underline">
                        mapbox.com
                      </a>
                    </p>
                    <input
                      type="text"
                      placeholder="Paste your Mapbox public token here..."
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="w-full p-3 border rounded-md"
                    />
                    <Button 
                      onClick={handleTokenSubmit}
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      disabled={!mapboxToken.trim()}
                    >
                      Initialize Map
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Map Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">General View</Button>
                <Button variant="outline" size="sm">Specific View</Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Active Projects</span>
              </div>
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Project Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-xs text-muted-foreground">Total Projects</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-secondary">10</div>
                    <div className="text-xs text-muted-foreground">Regions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-success">89</div>
                    <div className="text-xs text-muted-foreground">Ongoing</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">67</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Project Details */}
            {selectedProject && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedProject.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm font-medium">{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <span className="text-sm font-medium">{selectedProject.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-success text-success-foreground">
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{selectedProject.completion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${selectedProject.completion}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Key Actors</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.actors.map((actor: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    View Full Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Active Projects</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Completed Projects</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Planning Phase</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection2;