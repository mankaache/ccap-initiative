import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const MapSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"general" | "specific">("general");
  const { t } = useTranslation();

  // Mock data for demonstration
  const regions = [
    {
      id: "center",
      name: "Centre Region",
      projects: 42,
      budget: "$2.8M",
      coordinates: { x: 45, y: 35 },
      activeProjects: 28,
      completedProjects: 14,
      majorFunders: ["World Bank", "GEF", "Government"]
    },
    {
      id: "littoral",
      name: "Littoral Region", 
      projects: 38,
      budget: "$3.2M",
      coordinates: { x: 40, y: 55 },
      activeProjects: 25,
      completedProjects: 13,
      majorFunders: ["Green Climate Fund", "AfDB"]
    },
    {
      id: "west",
      name: "West Region",
      projects: 29,
      budget: "$1.9M", 
      coordinates: { x: 35, y: 40 },
      activeProjects: 19,
      completedProjects: 10,
      majorFunders: ["EU", "Government"]
    },
    {
      id: "southwest",
      name: "Southwest Region",
      projects: 31,
      budget: "$2.1M",
      coordinates: { x: 25, y: 65 },
      activeProjects: 22,
      completedProjects: 9,
      majorFunders: ["World Bank", "NGOs"]
    },
    {
      id: "northwest",
      name: "Northwest Region", 
      projects: 27,
      budget: "$1.7M",
      coordinates: { x: 30, y: 25 },
      activeProjects: 18,
      completedProjects: 9,
      majorFunders: ["Government", "Communities"]
    },
    {
      id: "far-north",
      name: "Far North Region",
      projects: 25,
      budget: "$1.5M",
      coordinates: { x: 50, y: 15 },
      activeProjects: 16,
      completedProjects: 9,
      majorFunders: ["UN Agencies", "Government"]
    }
  ];

  const handleRegionClick = (region:any) => {
    setSelectedRegion(selectedRegion === region.id ? null : region.id);
  };

  const selectedRegionData = regions.find(r => r.id === selectedRegion);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('map.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="bg-background border-border shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Cameroon Climate Projects</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Map SVG - Simplified Cameroon outline */}
                <div className="relative bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-8 h-96 overflow-hidden">
                  <svg viewBox="0 0 100 80" className="w-full h-full">
                    {/* Simplified Cameroon shape */}
                    <path
                      d="M20 20 L25 15 L35 18 L45 12 L55 15 L65 20 L70 30 L75 45 L70 60 L65 70 L55 75 L45 72 L35 75 L25 70 L20 60 L15 45 L18 30 Z"
                      fill="hsl(var(--accent))"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                      className="transition-colors duration-300"
                    />
                    
                    {/* Region dots */}
                    {regions.map((region) => (
                      <g key={region.id}>
                        <circle
                          cx={region.coordinates.x}
                          cy={region.coordinates.y}
                          r={selectedRegion === region.id ? "4" : "3"}
                          fill="hsl(var(--primary))"
                          stroke="white"
                          strokeWidth="1"
                          className="cursor-pointer transition-all duration-300 hover:r-4 hover:fill-primary-hover"
                          onClick={() => handleRegionClick(region)}
                        />
                        
                        {/* Tooltip on hover */}
                        {selectedRegion === region.id && (
                          <g>
                            <rect
                              x={region.coordinates.x + 5}
                              y={region.coordinates.y - 8}
                              width="20"
                              height="12"
                              fill="hsl(var(--background))"
                              stroke="hsl(var(--border))"
                              strokeWidth="0.5"
                              rx="2"
                              className="animate-fade-in"
                            />
                            <text
                              x={region.coordinates.x + 15}
                              y={region.coordinates.y - 2}
                              fontSize="3"
                              fill="hsl(var(--foreground))"
                              textAnchor="middle"
                              className="font-medium"
                            >
                              {region.projects}
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-foreground">Project Locations</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Click dots for details
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
             
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* View Mode Toggle */}
            <Card className="bg-background border-border">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "general" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("general")}
                    className="flex-1"
                  >
                    General View
                  </Button>
                  <Button
                    variant={viewMode === "specific" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("specific")}
                    className="flex-1"
                  >
                    Specific View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Region Details */}
            {selectedRegionData ? (
              <Card className="bg-background border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {selectedRegionData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-card rounded-lg">
                      <div className="text-2xl font-bold text-primary">{selectedRegionData.projects}</div>
                      <div className="text-xs text-muted-foreground">Total Projects</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-card rounded-lg">
                      <div className="text-2xl font-bold text-secondary">{selectedRegionData.budget}</div>
                      <div className="text-xs text-muted-foreground">Total Budget</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Projects</span>
                      <Badge variant="secondary" className="status-ongoing">
                        {selectedRegionData.activeProjects}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completed Projects</span>
                      <Badge variant="secondary" className="status-completed">
                        {selectedRegionData.completedProjects}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Major Funders</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedRegionData.majorFunders.map((funder, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {funder}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    {t('map.viewProject')} {selectedRegionData.name}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-background border-border">
                <CardContent className="p-8 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select a Region</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any red dot on the map to view detailed information about climate projects in that region.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">National Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Projects</span>
                  </div>
                  <span className="font-bold text-primary">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Total Investment</span>
                  </div>
                  <span className="font-bold text-secondary">$12.8M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent-foreground" />
                    <span className="text-sm">Active Regions</span>
                  </div>
                  <span className="font-bold">10/10</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;