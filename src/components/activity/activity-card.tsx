"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDate } from "@/lib/date";
import { Activity, ActivityType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ActivityIcon,
  FileTextIcon,
  ShoppingCartIcon,
  ReceiptIcon,
  CreditCardIcon,
  TruckIcon,
  RotateCcwIcon,
  AlertTriangleIcon,
  HelpCircleIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ActivityActions from "./activity-actions";
import { Button } from "../ui/button";
import { getFollowUpActivitiesForActivity } from "@/db/activities.queries";

interface ActivityCardProps {
  activity: Activity;
  contactId: string;
  successCallback?: () => void;
}

const getActivityTypeIcon = (type: ActivityType) => {
  switch (type) {
    case ActivityType.ENQUIRY:
      return <HelpCircleIcon className="h-5 w-5" />;
    case ActivityType.QUOTATION_REQUEST:
      return <FileTextIcon className="h-5 w-5" />;
    case ActivityType.PURCHASE_ORDER:
      return <ShoppingCartIcon className="h-5 w-5" />;
    case ActivityType.INVOICE:
      return <ReceiptIcon className="h-5 w-5" />;
    case ActivityType.PAYMENT:
      return <CreditCardIcon className="h-5 w-5" />;
    case ActivityType.DELIVERY:
      return <TruckIcon className="h-5 w-5" />;
    case ActivityType.RETURN:
      return <RotateCcwIcon className="h-5 w-5" />;
    case ActivityType.COMPLAINT:
      return <AlertTriangleIcon className="h-5 w-5" />;
    default:
      return <ActivityIcon className="h-5 w-5" />;
  }
};

const getActivityTypeColor = (type: ActivityType) => {
  switch (type) {
    case ActivityType.ENQUIRY:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case ActivityType.QUOTATION_REQUEST:
      return "bg-purple-50 text-purple-700 border-purple-200";
    case ActivityType.PURCHASE_ORDER:
      return "bg-green-50 text-green-700 border-green-200";
    case ActivityType.INVOICE:
      return "bg-orange-50 text-orange-700 border-orange-200";
    case ActivityType.PAYMENT:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case ActivityType.DELIVERY:
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case ActivityType.RETURN:
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case ActivityType.COMPLAINT:
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const getActivityTypeIconColor = (type: ActivityType) => {
  switch (type) {
    case ActivityType.ENQUIRY:
      return "bg-blue-100 text-blue-600";
    case ActivityType.QUOTATION_REQUEST:
      return "bg-purple-100 text-purple-600";
    case ActivityType.PURCHASE_ORDER:
      return "bg-green-100 text-green-600";
    case ActivityType.INVOICE:
      return "bg-orange-100 text-orange-600";
    case ActivityType.PAYMENT:
      return "bg-emerald-100 text-emerald-600";
    case ActivityType.DELIVERY:
      return "bg-cyan-100 text-cyan-600";
    case ActivityType.RETURN:
      return "bg-yellow-100 text-yellow-600";
    case ActivityType.COMPLAINT:
      return "bg-red-100 text-red-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export default function ActivityCard({
  activity,
  contactId,
  successCallback,
}: ActivityCardProps) {
  const [viewDetails, setViewDetails] = useState(false);
  const [viewFollowUp, setViewFollowUp] = useState(false);
  const [followUpActivities, setFollowUpActivities] = useState<Activity[]>([]);
  const formattedDate = formatDate(activity.createdAt);
  const followUpDate = activity.followUpDate
    ? formatDate(activity.followUpDate)
    : null;

  const followUpActivitiesFetchFunction = useCallback(async () => {
    const followUpActivities = await getFollowUpActivitiesForActivity(
      activity.id
    );
    setFollowUpActivities(followUpActivities);
  }, [activity.id]);

  useEffect(() => {
    const fetchFollowUpActivities = async () => {
      if (viewFollowUp) {
        followUpActivitiesFetchFunction();
      }
    };
    fetchFollowUpActivities();
  }, [followUpActivitiesFetchFunction, viewFollowUp]);

  return (
    <Card className="bg-yellow-50 mt-4 shadow-md hover:shadow-lg transition-all duration-200 relative rounded-lg p-0 overflow-hidden w-full max-w-6xl mx-auto border border-yellow-200">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-yellow-500" />

      {/* Header Section */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className={`p-2.5 ${getActivityTypeIconColor(
              activity.type
            )} rounded-lg flex items-center justify-center shadow-sm`}
          >
            {getActivityTypeIcon(activity.type)}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-xl text-slate-800">
              {activity.title}
            </h3>
            <Badge
              variant="outline"
              className={`${getActivityTypeColor(
                activity.type
              )} border text-xs px-3 py-1.5 rounded-lg font-medium`}
            >
              {activity.type
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </Badge>
          </div>
        </div>
        <div
          className="flex flex-row items-center gap-4"
          onClick={() => {
            setViewDetails(!viewDetails);
          }}
        >
          {activity.needFollowUp && followUpDate && (
            <div className="bg-blue-50 border border-blue-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium">
              Follow up on{" "}
              <span className="font-semibold text-slate-900">
                {followUpDate.day}
                <sup className="text-xs">{followUpDate.suffix}</sup>{" "}
                {followUpDate.month}, {followUpDate.year}
              </span>{" "}
              by{" "}
              <span className="font-semibold text-blue-700">
                {activity.assignedTo?.firstName} {activity.assignedTo?.lastName}
              </span>
            </div>
          )}
          {viewDetails ? (
            <ChevronUp className="h-5 w-5 cursor-pointer text-slate-600" />
          ) : (
            <ChevronDown className="h-5 w-5 cursor-pointer text-slate-600" />
          )}
        </div>
      </div>

      {/* Description */}
      {viewDetails && (
        <>
          <div className="px-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <p className="text-slate-700 text-base leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="flex justify-between items-center px-6 pb-3">
            <div className="flex items-center gap-4">
              <div className="text-sm text-yellow-800 bg-yellow-50 px-3 py-1.5 rounded-lg font-medium">
                Created {formattedDate.day}
                <sup className="text-xs">{formattedDate.suffix}</sup>{" "}
                {formattedDate.month}, {formattedDate.year}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewFollowUp(!viewFollowUp)}
                className="text-slate-600 hover:text-yellow-800 hover:font-bold text-sm px-3 py-2 cursor-pointer font-medium"
              >
                {viewFollowUp ? "Hide Follow Ups" : "View Follow Ups"}
              </Button>
            </div>

            <ActivityActions
              activity={activity}
              contactId={contactId}
              successCallback={successCallback}
            />
          </div>

          {/* Follow-up Activities */}
          {viewFollowUp && followUpActivities.length > 0 && (
            <div className="px-6 pb-4 space-y-3 bg-slate-50/20">
              {followUpActivities?.map((followUp) => (
                <div key={followUp.id} className="ml-2 pl-2 py-2">
                  <ActivityCard
                    activity={followUp}
                    contactId={contactId}
                    successCallback={followUpActivitiesFetchFunction}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
