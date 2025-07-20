"use client";

import { Activity } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import ActivityCard from "./activity-card";
import { ActivityIcon } from "lucide-react";

interface ActivityViewProps {
  activityFetchFunction: () => Promise<Activity[]>;
}

export default function ActivitiesView({
  activityFetchFunction,
}: ActivityViewProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = useCallback(async () => {
    const activities = await activityFetchFunction();
    setActivities(activities);
  }, [activityFetchFunction]);

  useEffect(() => {
    fetchActivities();
  }, [activityFetchFunction, fetchActivities]);

  return (
    <div>
      {activities.length > 0 ? (
        <div className="flex flex-col items-start w-full">
          {activities?.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              contactId={activity.contactId}
              successCallback={fetchActivities}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-64 bg-white rounded-lg border shadow-sm">
          <div className="text-center space-y-2">
            <div className="h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
              <ActivityIcon className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No activities found
            </h3>
            <p className="text-sm text-slate-500">Try adjusting your filters</p>
          </div>
        </div>
      )}
    </div>
  );
}
