import { createCountry } from "@/actions/country";
import { getCountriesBySearchTerm } from "@/db/country.queries";
import { Country } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useCountry() {
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [debouncedCountrySearchTerm, setDebouncedCountrySearchTerm] =
    useState("");
  const [selectedCountry, setSelectedCountry] =
    useState<Partial<Country> | null>(null);
  const [openCountry, setOpenCountry] = useState(false);

  const queryClient = useQueryClient();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCountrySearchTerm(countrySearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [countrySearchTerm]);

  // Capitalize search term
  const capitalizedSearchTerm = debouncedCountrySearchTerm.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );

  // Query for fetching countries
  const { data: countryOptions = [], isLoading } = useQuery({
    queryKey: ["countries", capitalizedSearchTerm],
    queryFn: () => getCountriesBySearchTerm(capitalizedSearchTerm),
    enabled: capitalizedSearchTerm.trim() !== "",
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating country
  const createCountryMutation = useMutation({
    mutationFn: (countryName: string) => createCountry(countryName),
    onSuccess: (result) => {
      if (result.success) {
        // Set the newly created country as selected
        setSelectedCountry(result.country || null);
        // Invalidate countries query to refetch
        queryClient.invalidateQueries({ queryKey: ["countries"] });
        // Update search term to trigger refetch
        setCountrySearchTerm(result.country?.name || "");
        // Close popover after brief delay
        setTimeout(() => {
          setOpenCountry(false);
        }, 500);
      }
    },
    onError: (error) => {
      console.error("Error creating country:", error);
    },
  });

  const handleCreateCountry = async (countryName: string) => {
    await createCountryMutation.mutateAsync(countryName);
  };

  return {
    countrySearchTerm,
    setCountrySearchTerm,
    countryOptions,
    selectedCountry,
    setSelectedCountry,
    handleCreateCountry,
    openCountry,
    setOpenCountry,
    isCreatingCountry: createCountryMutation.isPending,
    isLoading,
    setIsCreatingCountry: () => {}, // Kept for backward compatibility
  };
}
