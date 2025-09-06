'use client';

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Filter, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterState {
  projects: string[];
  actors: string[];
  locations: string[];
  funding: string[];
}

interface FilterBarProps {
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterBar = ({ activeFilters, onFilterChange }: FilterBarProps) => {
  const { t } = useTranslation();

  const filterCategories: FilterCategory[] = useMemo(() => [
    {
      id: "projects",
      label: t('filters.projects'),
      options: [
        { id: "adaptation", label: "Adaptation Projects" },
        { id: "mitigation", label: "Mitigation Projects" },
        { id: "redd", label: "REDD+ Projects" },
        { id: "renewable", label: "Renewable Energy" },
        { id: "forestry", label: "Forestry & Conservation" },
      ],
    },
    {
      id: "actors",
      label: t('filters.actors'),
      options: [
        { id: "minepded", label: "MINEPDED" },
        { id: "ngos", label: "NGOs" },
        { id: "private-sector", label: "Private Sector" },
        { id: "research", label: "Research Institutions" },
        { id: "communities", label: "Local Communities" },
      ],
    },
    {
      id: "locations",
      label: t('filters.locations'),
      options: [
        { id: "center", label: "Centre Region" },
        { id: "littoral", label: "Littoral Region" },
        { id: "west", label: "West Region" },
        { id: "southwest", label: "Southwest Region" },
        { id: "northwest", label: "Northwest Region" },
        { id: "far-north", label: "Far North Region" },
      ],
    },
    {
      id: "funding",
      label: t('filters.funding'),
      options: [
        { id: "world-bank", label: "World Bank" },
        { id: "gef", label: "Global Environment Facility" },
        { id: "green-climate", label: "Green Climate Fund" },
        { id: "afdb", label: "African Development Bank" },
        { id: "eu", label: "European Union" },
        { id: "government", label: "Government of Cameroon" },
      ],
    },
  ], [t]);

  const handleFilterSelect = (categoryId: keyof FilterState, optionId: string) => {
    const currentFilters = activeFilters[categoryId] || [];
    const isSelected = currentFilters.includes(optionId);
    
    const newFilters = {
      ...activeFilters,
      [categoryId]: isSelected
        ? currentFilters.filter(id => id !== optionId)
        : [...currentFilters, optionId]
    };
    
    onFilterChange(newFilters);
  };

  const removeFilter = (categoryId: keyof FilterState, optionId: string) => {
    const newFilters = {
      ...activeFilters,
      [categoryId]: (activeFilters[categoryId] || []).filter(id => id !== optionId)
    };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      projects: [],
      actors: [],
      locations: [],
      funding: []
    });
  };

  const handleQuickAccess = (categoryId: keyof FilterState) => {
    const category = filterCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    const allOptionIds = category.options.map(opt => opt.id);
    const newFilters = {
      ...activeFilters,
      [categoryId]: allOptionIds
    };
    onFilterChange(newFilters);
  };

  const getSelectedOption = (categoryId: string, optionId: string) => {
    const category = filterCategories.find(cat => cat.id === categoryId);
    return category?.options.find(opt => opt.id === optionId);
  };

  const totalActiveFilters = useMemo(() => 
    Object.values(activeFilters).reduce((sum, filters) => sum + filters.length, 0),
    [activeFilters]
  );

  const quickAccessLinks = useMemo(() => [
    { id: 'funding', label: t('filters.allFunds') },
    { id: 'projects', label: t('filters.allProjects') },
    { id: 'actors', label: t('filters.allActors') },
    { id: 'locations', label: t('filters.allLocations') }
  ], [t]);

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">{t('filters.title')}</span>
          </div>
          
          {filterCategories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {category.label}
                  {activeFilters[category.id as keyof FilterState]?.length > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                      {activeFilters[category.id as keyof FilterState].length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto bg-background border-border shadow-elegant">
                {category.options.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterSelect(category.id as keyof FilterState, option.id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={activeFilters[category.id as keyof FilterState]?.includes(option.id) || false}
                        readOnly
                        className="rounded border-border"
                      />
                      <span className="text-foreground">{option.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {totalActiveFilters > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              {t('filters.clearAll')}
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {totalActiveFilters > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([categoryId, optionIds]) =>
              optionIds.map((optionId:any) => {
                const option = getSelectedOption(categoryId, optionId);
                return option ? (
                  <Badge
                    key={`${categoryId}-${optionId}`}
                    variant="secondary"
                    className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20"
                  >
                    {option.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeFilter(categoryId as keyof FilterState, optionId)}
                    />
                  </Badge>
                ) : null;
              })
            )}
          </div>
        )}

        {/* Quick Access Links */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">{t('filters.quickAccess')}</span>
            {quickAccessLinks.map((link, index) => (
              <div key={link.id} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-muted-foreground">•</span>
                )}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="h-auto p-0 text-primary"
                  onClick={() => handleQuickAccess(link.id as keyof FilterState)}
                >
                  {link.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;