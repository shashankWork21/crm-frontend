"use client";

import { Region } from "@/lib/types";
import ProtectedRoute from "../auth/protected-route";
import RegionsTable from "../regions/regions-table";
import { useState } from "react";
import RegionFormDialog from "../regions/region-form-dialog";
import { Plus } from "lucide-react";
import RegionFilters from "../regions/region-filters";
import RegionBadges from "../regions/region-badges";

interface RegionsPageViewProps {
  regions: Region[];
}

export default function RegionsPageView({ regions }: RegionsPageViewProps) {
  const [regionCreate, setRegionCreate] = useState(false);
  const button = (
    <button
      onClick={() => setRegionCreate(!regionCreate)}
      className="flex flex-row items-center justify-center space-x-2 bg-slate-800 text-slate-100 pl-2 pr-4 py-2 rounded-lg hover:bg-slate-700 transition-colors shadow-md cursor-pointer"
    >
      <Plus className="h-6 w-6 mr-2" />
      Add Region
    </button>
  );

  const states = regions.reduce((states: string[], region: Region) => {
    if (!states.includes(region.state)) {
      states.push(region.state);
    }
    return states;
  }, []);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  return (
    <ProtectedRoute>
      <div className="w-full mx-auto mt-10 h-fit flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-row justify-between items-center w-4/5 mx-auto mb-10">
          <h1 className="text-center font-bold text-2xl">Regions</h1>
          <RegionFormDialog
            title="Create new Region"
            description="Create a new region to consolidate and manage your contacts, as well as their schedules."
            button={button}
            id={null}
            regionEdit={regionCreate}
            setRegionEdit={setRegionCreate}
            defaultValues={{ name: "", state: "", country: "" }}
            submitFormText="Create Region"
          />
        </div>
        <div className="w-4/5 flex flex-row items-center justify-start space-x-3">
          <RegionFilters
            states={states}
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
          />
          <RegionBadges
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
          />
        </div>
        <RegionsTable
          regions={
            selectedStates.length > 0
              ? regions.filter((region: Region) =>
                  selectedStates.includes(region.state)
                )
              : regions
          }
        />
      </div>
    </ProtectedRoute>
  );
}
