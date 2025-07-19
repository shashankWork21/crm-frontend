"use client";

import ActivitiesView from "@/components/activity/activities-view";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  searchActivities,
  SearchActivityParams,
} from "@/db/activities.queries";

import { ActivityType } from "@/lib/types";
import { X } from "lucide-react";
import { useState } from "react";

interface DashboardActivitiesViewProps {
  organisationId: string;
}

export default function DashboardActivitiesView({
  organisationId,
}: DashboardActivitiesViewProps) {
  const [searchParams, setSearchParams] = useState<SearchActivityParams>({
    organisationId,
    types: [ActivityType.ENQUIRY],
    needFollowUp: false,
    overdue: false,
  });

  const [currentType, setCurrentType] = useState<string>("ENQUIRY");

  const handleTypeChange = (value: string) => {
    if (
      searchParams.types &&
      !searchParams.types.includes(value as ActivityType)
    ) {
      setSearchParams((prev) => ({
        ...prev,
        types: [...(prev.types || []), value as ActivityType],
      }));
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <div className="bg-white max-w-6xl mx-auto rounded-lg border shadow-sm p-6 space-y-6">
        <div className="w-full space-y-3">
          <h3 className="text-lg font-medium text-slate-700">Filters</h3>
          <div className="flex flex-col items-start justify-between gap-6">
            <div className="flex flex-row items-start justify-between gap-2 flex-wrap">
              <h3 className="text-md font-medium text-slate-700">
                Follow Up Type
              </h3>
              <Select
                value={currentType as string}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select Activity Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Object.values(ActivityType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {searchParams.types && searchParams.types.length > 0 && (
                <>
                  {searchParams.types.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="cursor-pointer bg-slate-900 text-white flex flex-row items-center gap-4"
                      onClick={() => {
                        setSearchParams((prev) => ({
                          ...prev,
                          types: prev.types?.filter((type) => type !== item),
                        }));
                        setCurrentType("");
                      }}
                    >
                      <span className="text-md">
                        {item
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </span>
                      <X className="cursor-pointer" />
                    </Badge>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-row items-center justify-start gap-4">
              <div className="flex flex-row items-center gap-2">
                <Checkbox
                  className={`cursor-pointer ${
                    searchParams.needFollowUp ? "bg-blue-800 text-white" : ""
                  }`}
                  checked={searchParams.needFollowUp}
                  onCheckedChange={() =>
                    setSearchParams({
                      ...searchParams,
                      needFollowUp: !searchParams.needFollowUp,
                    })
                  }
                />
                <span className="text-slate-700">Follow Up Activities</span>
              </div>
              {searchParams.needFollowUp && (
                <div className="flex flex-row items-center gap-2">
                  <Checkbox
                    className={`cursor-pointer ${
                      searchParams.overdue ? "bg-blue-800 text-white" : ""
                    }`}
                    checked={searchParams.overdue}
                    onCheckedChange={() =>
                      setSearchParams({
                        ...searchParams,
                        overdue: !searchParams.overdue,
                      })
                    }
                  />
                  <span className="text-slate-700">Overdue</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ActivitiesView
        activityFetchFunction={searchActivities.bind(null, searchParams)}
      />
    </div>
  );
}
