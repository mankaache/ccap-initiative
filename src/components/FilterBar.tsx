"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Filter } from "lucide-react";
import { FilterState } from "./FilteredProjects";

type Props = {
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  options: {
    projectTypes: string[];
    categories: string[];
    fundingSources: string[];
    regions: string[];
  };
};

const FilterBar = ({ activeFilters, onFilterChange, options }: Props) => {
  const handleFilterSelect = (category: keyof FilterState, value: string) => {
    const current = activeFilters[category] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFilterChange({ ...activeFilters, [category]: newValues });
  };

  const removeFilter = (category: keyof FilterState, value: string) => {
    onFilterChange({
      ...activeFilters,
      [category]: activeFilters[category].filter((v) => v !== value),
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      projectType: [],
      categories: [],
      funding: [],
      regions: [],
    });
  };

  const totalActiveFilters = Object.values(activeFilters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const filterCategories = [
    { id: "projectType", label: "Project Type", options: options.projectTypes },
    { id: "categories", label: "Categories", options: options.categories },
    { id: "funding", label: "Funding Source", options: options.fundingSources },
    { id: "regions", label: "Regions", options: options.regions },
  ] as const;

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filters</span>
          </div>

          {filterCategories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {category.label}
                  {activeFilters[category.id]?.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters[category.id].length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                {category.options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterSelect(
                        category.id as keyof FilterState,
                        option
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={
                          activeFilters[category.id]?.includes(option) || false
                        }
                        readOnly
                      />
                      <span>{option}</span>
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
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {totalActiveFilters > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([categoryId, optionIds]) =>
              optionIds.map((optionId) => (
                <Badge
                  key={`${categoryId}-${optionId}`}
                  variant="secondary"
                  className="flex items-center gap-1 bg-primary/10 text-primary"
                >
                  {optionId}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() =>
                      removeFilter(categoryId as keyof FilterState, optionId)
                    }
                  />
                </Badge>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
