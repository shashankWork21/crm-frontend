"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import ActivityActions from "./activity-actions";
import { Button } from "../ui/button";
import { getFollowUpActivitiesForActivity } from "@/db/activities.queries";

interface ActivityCardProps {
  activity: Activity;
  contactId: string;
}

const getActivityTypeIcon = (type: ActivityType) => {
  switch (type) {
    case ActivityType.ENQUIRY:
      return <HelpCircleIcon className="h-4 w-4" />;
    case ActivityType.QUOTATION_REQUEST:
      return <FileTextIcon className="h-4 w-4" />;
    case ActivityType.PURCHASE_ORDER:
      return <ShoppingCartIcon className="h-4 w-4" />;
    case ActivityType.INVOICE:
      return <ReceiptIcon className="h-4 w-4" />;
    case ActivityType.PAYMENT:
      return <CreditCardIcon className="h-4 w-4" />;
    case ActivityType.DELIVERY:
      return <TruckIcon className="h-4 w-4" />;
    case ActivityType.RETURN:
      return <RotateCcwIcon className="h-4 w-4" />;
    case ActivityType.COMPLAINT:
      return <AlertTriangleIcon className="h-4 w-4" />;
    default:
      return <ActivityIcon className="h-4 w-4" />;
  }
};

const getActivityTypeColor = (type: ActivityType) => {
  switch (type) {
    case ActivityType.ENQUIRY:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case ActivityType.QUOTATION_REQUEST:
      return "bg-purple-100 text-purple-800 border-purple-200";
    case ActivityType.PURCHASE_ORDER:
      return "bg-green-100 text-green-800 border-green-200";
    case ActivityType.INVOICE:
      return "bg-orange-100 text-orange-800 border-orange-200";
    case ActivityType.PAYMENT:
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case ActivityType.DELIVERY:
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case ActivityType.RETURN:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case ActivityType.COMPLAINT:
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export default function ActivityCard({
  activity,
  contactId,
}: ActivityCardProps) {
  const [viewFollowUp, setViewFollowUp] = useState(false);
  const [followUpActivities, setFollowUpActivities] = useState<Activity[]>([]);
  const formattedDate = formatDate(activity.createdAt);
  const followUpDate = activity.followUpDate
    ? formatDate(activity.followUpDate)
    : null;

  useEffect(() => {
    const fetchFollowUpActivities = async () => {
      if (viewFollowUp) {
        const followUpActivities = await getFollowUpActivitiesForActivity(
          activity.id
        );
        setFollowUpActivities(followUpActivities);
      }
    };
    fetchFollowUpActivities();
  }, [activity.id, viewFollowUp]);

  return (
    <Card
      className="bg-slate-200 mt-3 shadow-lg relative rounded-2xl p-0 overflow-visible w-full border border-slate-300"
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)" }}
    >
      <div
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl bg-blue-500"
        style={{ boxShadow: "0 0 0 2px #e0e7ef" }}
      />
      <div className="flex justify-between items-start px-16 py-6 w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl flex items-center justify-center">
            {getActivityTypeIcon(activity.type)}
          </div>
          <h3 className="font-bold text-xl text-slate-900 tracking-tight mr-2">
            {activity.title}
          </h3>
          <Badge
            variant="outline"
            className={`${getActivityTypeColor(
              activity.type
            )} border-slate-200 font-semibold px-3 py-1 rounded-md text-xs tracking-wide shadow-sm`}
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
        {activity.needFollowUp && followUpDate && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-slate-600 bg-slate-100 px-4 py-1.5 rounded-lg">
              Follow up on{" "}
              <span className="font-bold text-slate-900">
                {followUpDate.day}
                <sup>{followUpDate.suffix}</sup> {followUpDate.month},{" "}
                {followUpDate.year}
              </span>{" "}
              by{" "}
              <span className="font-bold text-slate-900">
                {activity.assignedTo?.firstName} {activity.assignedTo?.lastName}
              </span>
            </span>
          </div>
        )}
      </div>
      {/* Description Box */}
      <div className="flex flex-row justify-start items-center px-16">
        <div className="w-full bg-white border-2 border-slate-200 rounded-xl px-10 flex items-center justify-center min-h-[80px]">
          <p className="text-slate-800 text-lg text-center leading-relaxed w-full">
            {activity.description}
          </p>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col items-start">
        <Button variant="ghost" onClick={() => setViewFollowUp(!viewFollowUp)}>
          {viewFollowUp ? "Hide Follow Ups" : "View Follow Ups"}
        </Button>
      </div>
      {viewFollowUp && followUpActivities.length > 0 && (
        <div className="px-4">
          {followUpActivities?.map((followUp) => (
            <ActivityCard
              key={followUp.id}
              activity={followUp}
              contactId={contactId}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center px-16 py-4 w-full">
        <div className="text-sm text-slate-500 font-medium">
          Created On {formattedDate.day}
          <sup>{formattedDate.suffix}</sup> {formattedDate.month},{" "}
          {formattedDate.year}
        </div>
        <div>
          <ActivityActions activity={activity} contactId={contactId} />
        </div>
      </div>
    </Card>
  );
}
