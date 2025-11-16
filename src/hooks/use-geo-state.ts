import { createState } from "@/actions/state";
import { getStatesBySearchTerm } from "@/db/state.queries";
import { State } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useGeoState(countryId: string) {
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [debouncedStateSearchTerm, setDebouncedStateSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<Partial<State> | null>(
    null
  );
  const [openState, setOpenState] = useState(false);

  const queryClient = useQueryClient();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedStateSearchTerm(stateSearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [stateSearchTerm]);

  // Capitalize search term
  const capitalizedSearchTerm = debouncedStateSearchTerm.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );

  // Query for fetching states
  const { data: stateOptions = [], isLoading } = useQuery({
    queryKey: ["states", capitalizedSearchTerm, countryId],
    queryFn: () => getStatesBySearchTerm(capitalizedSearchTerm, countryId),
    enabled: capitalizedSearchTerm.trim() !== "" && countryId !== "",
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating state
  const createStateMutation = useMutation({
    mutationFn: (stateName: string) => createState(stateName, countryId),
    onSuccess: (result) => {
      if (result.success) {
        setSelectedState(result.state || null);
        queryClient.invalidateQueries({ queryKey: ["states", countryId] });
        setStateSearchTerm(result.state?.name || "");
        setTimeout(() => {
          setOpenState(false);
        }, 500);
      }
    },
    onError: (error) => {
      console.error("Error creating state:", error);
    },
  });

  const handleCreateState = async (stateName: string) => {
    await createStateMutation.mutateAsync(stateName);
  };

  return {
    stateSearchTerm,
    setStateSearchTerm,
    stateOptions,
    selectedState,
    setSelectedState,
    handleCreateState,
    openState,
    setOpenState,
    isCreatingState: createStateMutation.isPending,
    isLoading,
  };
}
