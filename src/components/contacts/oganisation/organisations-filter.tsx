"use client";

import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Organisation, BranchType } from "@/lib/types";
import { FilterX, ArrowUpDown } from "lucide-react";

interface OrganisationsFilterProps {
  organisations: Organisation[];
  onFilteredOrganisations: (filteredOrganisations: Organisation[]) => void;
}

export interface OrganisationFilterState {
  state: string;
  region: string;
  city: string;
}

export interface OrganisationSortState {
  field: string;
  direction: "asc" | "desc";
}

export default function OrganisationsFilter({
  organisations,
  onFilteredOrganisations,
}: OrganisationsFilterProps) {
  const [filters, setFilters] = useState<OrganisationFilterState>({
    state: "all",
    region: "all",
    city: "all",
  });

  const [sort, setSort] = useState<OrganisationSortState>({
    field: "none",
    direction: "asc",
  });

  // Helper function to get headquarters branch
  const getHeadquarters = (organisation: Organisation) => {
    return organisation.branches?.find(
      (branch) => branch.type === BranchType.HEADQUARTERS
    );
  };

  // Extract unique values for filters from the organisation data
  const filterOptions = useMemo(() => {
    const states = new Set<string>();
    const regions = new Set<string>();
    const cities = new Set<string>();

    organisations.forEach((organisation) => {
      const headquarters = getHeadquarters(organisation);
      if (headquarters?.region?.state) {
        states.add(headquarters.region.state);
      }
      if (headquarters?.region?.name) {
        regions.add(headquarters.region.name);
      }
      if (headquarters?.city) {
        cities.add(headquarters.city);
      }
    });

    return {
      states: Array.from(states).sort(),
      regions: Array.from(regions).sort(),
      cities: Array.from(cities).sort(),
    };
  }, [organisations]);

  // Sort organisations based on field and direction
  const sortOrganisations = (
    organisationsToSort: Organisation[],
    sortField: string,
    sortDirection: "asc" | "desc"
  ): Organisation[] => {
    if (sortField === "none") return organisationsToSort;

    return [...organisationsToSort].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      const aHeadquarters = getHeadquarters(a);
      const bHeadquarters = getHeadquarters(b);

      switch (sortField) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "state":
          aValue = aHeadquarters?.region?.state || "";
          bValue = bHeadquarters?.region?.state || "";
          break;
        case "region":
          aValue = aHeadquarters?.region?.name || "";
          bValue = bHeadquarters?.region?.name || "";
          break;
        case "city":
          aValue = aHeadquarters?.city || "";
          bValue = bHeadquarters?.city || "";
          break;
        default:
          return 0;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Filter and sort organisations based on current filter and sort state
  const applyFiltersAndSort = (
    newFilters: OrganisationFilterState,
    newSort?: OrganisationSortState
  ) => {
    const currentSort = newSort || sort;
    let filteredOrganisations = organisations;

    // Apply filters
    if (newFilters.state !== "all") {
      filteredOrganisations = filteredOrganisations.filter((organisation) => {
        const headquarters = getHeadquarters(organisation);
        return headquarters?.region?.state === newFilters.state;
      });
    }

    if (newFilters.region !== "all") {
      filteredOrganisations = filteredOrganisations.filter((organisation) => {
        const headquarters = getHeadquarters(organisation);
        return headquarters?.region?.name === newFilters.region;
      });
    }

    if (newFilters.city !== "all") {
      filteredOrganisations = filteredOrganisations.filter((organisation) => {
        const headquarters = getHeadquarters(organisation);
        return headquarters?.city === newFilters.city;
      });
    }

    // Apply sorting
    const sortedOrganisations = sortOrganisations(
      filteredOrganisations,
      currentSort.field,
      currentSort.direction
    );

    onFilteredOrganisations(sortedOrganisations);
  };

  // Handle filter changes
  const handleFilterChange = (
    filterType: keyof OrganisationFilterState,
    value: string
  ) => {
    const newFilters = { ...filters, [filterType]: value };

    // Reset dependent filters when parent filter changes
    if (filterType === "state") {
      newFilters.region = "all";
      newFilters.city = "all";
    } else if (filterType === "region") {
      newFilters.city = "all";
    }

    setFilters(newFilters);
    applyFiltersAndSort(newFilters);
  };

  // Handle sort changes
  const handleSortChange = (field: string) => {
    let newSort: OrganisationSortState;

    if (sort.field === field) {
      // If same field, toggle direction
      newSort = {
        field,
        direction: sort.direction === "asc" ? "desc" : "asc",
      };
    } else {
      // If different field, start with ascending
      newSort = {
        field,
        direction: "asc",
      };
    }

    setSort(newSort);
    applyFiltersAndSort(filters, newSort);
  };

  // Clear all filters and sorting
  const clearFilters = () => {
    const resetFilters = {
      state: "all",
      region: "all",
      city: "all",
    };
    const resetSort = {
      field: "none",
      direction: "asc" as const,
    };
    setFilters(resetFilters);
    setSort(resetSort);
    onFilteredOrganisations(organisations);
  };

  // Get available regions based on selected state
  const availableRegions = useMemo(() => {
    if (filters.state === "all") return filterOptions.regions;

    const regionsInState = new Set<string>();
    organisations.forEach((organisation) => {
      const headquarters = getHeadquarters(organisation);
      if (
        headquarters?.region?.state === filters.state &&
        headquarters?.region?.name
      ) {
        regionsInState.add(headquarters.region.name);
      }
    });
    return Array.from(regionsInState).sort();
  }, [organisations, filters.state, filterOptions.regions]);

  // Get available cities based on selected state and region
  const availableCities = useMemo(() => {
    if (filters.state === "all" && filters.region === "all") {
      return filterOptions.cities;
    }

    const citiesInSelection = new Set<string>();
    organisations.forEach((organisation) => {
      const headquarters = getHeadquarters(organisation);
      const matchesState =
        filters.state === "all" ||
        headquarters?.region?.state === filters.state;
      const matchesRegion =
        filters.region === "all" ||
        headquarters?.region?.name === filters.region;

      if (matchesState && matchesRegion && headquarters?.city) {
        citiesInSelection.add(headquarters.city);
      }
    });
    return Array.from(citiesInSelection).sort();
  }, [organisations, filters.state, filters.region, filterOptions.cities]);

  const hasActiveFilters =
    filters.state !== "all" ||
    filters.region !== "all" ||
    filters.city !== "all" ||
    sort.field !== "none";

  return (
    <div className="w-4/5 mx-auto mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Filter Organisations:
          </h3>

          {/* State Filter */}
          <div className="min-w-[150px]">
            <Select
              value={filters.state}
              onValueChange={(value) => handleFilterChange("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">
                  All States ({filterOptions.states.length})
                </SelectItem>
                {filterOptions.states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region Filter */}
          <div className="min-w-[150px]">
            <Select
              value={filters.region}
              onValueChange={(value) => handleFilterChange("region", value)}
              disabled={
                filters.state !== "all" && availableRegions.length === 0
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">
                  All Regions ({availableRegions.length})
                </SelectItem>
                {availableRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Filter */}
          <div className="min-w-[150px]">
            <Select
              value={filters.city}
              onValueChange={(value) => handleFilterChange("city", value)}
              disabled={availableCities.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">
                  All Cities ({availableCities.length})
                </SelectItem>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Sort Label */}
          <h3 className="text-sm font-medium text-gray-700">Sort By:</h3>

          {/* Sort Field */}
          <div className="min-w-[150px]">
            <Select
              value={sort.field}
              onValueChange={(value) => handleSortChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="none">No Sorting</SelectItem>
                <SelectItem value="name">Organisation Name</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="state">State</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Direction Button */}
          {sort.field !== "none" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSortChange(sort.field)}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sort.direction === "asc" ? "A-Z" : "Z-A"}
            </Button>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter and Sort Summary */}
      {hasActiveFilters && (
        <div className="mt-2 text-sm text-gray-600">
          <span>Active: </span>
          {filters.state !== "all" && (
            <span className="font-medium">State: {filters.state}</span>
          )}
          {filters.region !== "all" && (
            <span className="font-medium ml-2">Region: {filters.region}</span>
          )}
          {filters.city !== "all" && (
            <span className="font-medium ml-2">City: {filters.city}</span>
          )}
          {sort.field !== "none" && (
            <span className="font-medium ml-2">
              Sorted by: {sort.field} (
              {sort.direction === "asc" ? "A-Z" : "Z-A"})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
