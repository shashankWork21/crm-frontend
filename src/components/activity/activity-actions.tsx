"use client";

import { Activity } from "@/lib/types";
import ActivityDialog from "./activity-dialog";
import DeleteDialog from "../general/delete-dialog";
import ActivityDeleteForm from "./activity-delete-form";
import FollowUpActivityDialog from "./activity-followup-dialog";

export interface ActivityActionsProps {
  activity: Activity;
  contactId: string;
  successCallback?: () => void;
}

export default function ActivityActions({
  activity,
  contactId,
  successCallback,
}: ActivityActionsProps) {
  return (
    <div className="flex flex-row justify-center items-start space-x-3 ml-auto mt-1">
      <ActivityDialog
        contactId={contactId}
        activity={activity}
        successCallback={successCallback}
      />
      {activity.needFollowUp && (
        <FollowUpActivityDialog
          contactId={contactId}
          followUpActivityId={activity.id}
          successCallback={successCallback}
        />
      )}
      <DeleteDialog
        id={activity.id}
        title="Delete Activity"
        description="Are you sure you want to delete this activity? This action cannot be undone."
        DeleteForm={ActivityDeleteForm}
        successCallback={successCallback}
      />
    </div>
  );
}
