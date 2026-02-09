import { createCity } from "@/actions/city";
import { getCitiesBySearchTerm } from "@/db/city.queries";
import { City } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useCity(stateId: string) {
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [debouncedCitySearchTerm, setDebouncedCitySearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<Partial<City> | null>(null);
  const [openCity, setOpenCity] = useState(false);

  const queryClient = useQueryClient();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCitySearchTerm(citySearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [citySearchTerm]);

  // Capitalize search term
  const capitalizedSearchTerm = debouncedCitySearchTerm.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );

  // Query for fetching cities
  const { data: cityOptions = [], isLoading } = useQuery({
    queryKey: ["cities", capitalizedSearchTerm, stateId],
    queryFn: () => getCitiesBySearchTerm(capitalizedSearchTerm, stateId),
    enabled: capitalizedSearchTerm.trim() !== "" && stateId !== "",
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating city
  const createCityMutation = useMutation({
    mutationFn: (cityName: string) => createCity(cityName, stateId),
    onSuccess: (result) => {
      if (result.success) {
        setSelectedCity(result.city || null);
        queryClient.invalidateQueries({ queryKey: ["cities", stateId] });
        setCitySearchTerm(result.city?.name || "");
        setTimeout(() => {
          setOpenCity(false);
        }, 500);
      }
    },
    onError: (error) => {
      console.error("Error creating city:", error);
    },
  });

  const handleCreateCity = async (cityName: string) => {
    await createCityMutation.mutateAsync(cityName);
  };

  return {
    citySearchTerm,
    setCitySearchTerm,
    cityOptions,
    selectedCity,
    setSelectedCity,
    handleCreateCity,
    openCity,
    setOpenCity,
    isCreatingCity: createCityMutation.isPending,
    isLoading,
  };
}
