"use client";

import { Activity, Contact, User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Building,
  Calendar,
  CheckCircle,
  Mail,
  Map,
  MapPin,
  Phone,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import ContactActions from "./contact-actions";
import { formatDate } from "@/lib/date";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import ActivityCard from "../activity/activity-card";
import { cascadeFollowup } from "@/actions/contact";

interface ContactCardProps {
  contact: Contact;
  team: User[];
  activityFetchFunction: () => Promise<Activity[]>;
  successCallback?: () => void;
}

export default function ContactCard({
  contact,
  team,
  activityFetchFunction,
  successCallback,
}: ContactCardProps) {
  const [viewActivities, setViewActivities] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const activities = await activityFetchFunction();
      setActivities(activities);
    };
    fetchActivities();
  }, [viewActivities, activityFetchFunction]);

  const [cascadeFollowupFormState, cascadeFollowupAction] = useActionState(
    cascadeFollowup.bind(
      null,
      contact.id,
      contact.followUpFrequency ? contact.followUpFrequency : 0
    ),
    {
      success: false,
      errors: {},
      message: "",
    }
  );

  useEffect(() => {
    if (cascadeFollowupFormState.success) {
      successCallback?.();
    }
  }, [cascadeFollowupFormState.success, successCallback]);

  return (
    <Card className="w-7/10 mx-auto mt-20 p-0 pb-5 shadow-lg bg-gradient-to-br from-slate-200 to-slate-300">
      <CardHeader className="w-full bg-gradient-to-br from-slate-500 to-slate-800 text-white rounded-t-lg py-3">
        <div className="flex flex-col items-start justify-between">
          <CardTitle className="text-3xl font-semibold my-3">
            {contact.name}
          </CardTitle>
          <div className="flex flex-row justify-start gap-8 w-full">
            <div className="flex flex-row items-center justify-start gap-1 text-lg">
              <Phone className="h-4 w-4" />
              <span className="">{contact.phoneNumber}</span>
            </div>
            {contact.email && (
              <div className="flex flex-row items-center justify-start gap-1 text-lg">
                <Mail className="h-4 w-4" />
                <span className="">{contact.email}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row items-center justify-end w-full">
            {contact.followUpFrequency && contact.followUpOn && (
              <div className="flex flex-row items-center justify-between gap-2 w-fit">
                <div className="w-fit rounded bg-gradient-to-br from-slate-500 to-slate-600 text-white py-2 px-4 flex flex-row items-center justify-between mx-0">
                  <p>
                    Follow up every{" "}
                    <span className="font-bold">
                      {contact.followUpFrequency}
                    </span>{" "}
                    days
                    {contact.assignedTo && (
                      <>
                        {" "}
                        by{" "}
                        <span className="font-bold">
                          {contact.assignedTo.firstName}{" "}
                          {contact.assignedTo.lastName}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className="w-fit rounded bg-gradient-to-br from-slate-500 to-slate-600 text-white py-2 px-4 flex flex-row items-center justify-between space-x-2">
                  <Calendar className="h-6 w-6" />
                  <p>
                    {formatDate(contact.followUpOn).day}
                    <sup>{formatDate(contact.followUpOn).suffix}</sup>{" "}
                    {formatDate(contact.followUpOn).month},{" "}
                    {formatDate(contact.followUpOn).year}
                  </p>
                  <form action={cascadeFollowupAction}>
                    <button type="submit">
                      <CheckCircle className="h-6 w-6 text-white cursor-pointer hover:h-8 hover:w-8 hover:text-green-400" />
                    </button>
                  </form>
                </div>
              </div>
            )}
            {contact.alternateNumber &&
              contact.alternateNumber !== "undefined" && (
                <div className="flex flex-row items-center justify-start gap-2">
                  <Phone className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-700">
                    {contact.alternateNumber}
                  </span>
                </div>
              )}
            <ContactActions
              contact={contact}
              team={team}
              successCallback={successCallback}
            />
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Building className="h-5 w-5 text-slate-600" />
                </TooltipTrigger>
                <TooltipContent className="bg-black px-2 py-1 rounded shadow-lg text-white">
                  Organisation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-slate-700">
              {contact.branch?.organisation?.name || "No Organisation"}
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MapPin className="h-5 w-5 text-slate-600" />
                </TooltipTrigger>
                <TooltipContent className="bg-black px-2 py-1 rounded shadow-lg text-white">
                  Location
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {contact.branch?.address && (
              <span className="text-slate-700 ml-2">
                {contact.branch?.address},
              </span>
            )}
            <span className="text-slate-700 ml-1">{contact.branch?.city}</span>
            <span className="text-slate-700">
              , {contact.branch?.postalCode}
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Map className="h-5 w-5 text-slate-600" />
                </TooltipTrigger>
                <TooltipContent className="bg-black px-2 py-1 rounded shadow-lg text-white">
                  Region
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-slate-700">
              {contact.branch?.region?.name}, {contact.branch?.region?.state}
            </span>
          </div>
          <div className="flex flex-row items-center justify-end w-full">
            <Button
              variant="ghost"
              onClick={() => setViewActivities(!viewActivities)}
              className="cursor-pointer text-slate-800 hover:text-slate-900 hover:bg-slate-300 transition-colors duration-200"
            >
              {viewActivities ? "Hide Activities" : "View Activities"}
            </Button>
          </div>
        </div>
        {viewActivities && (
          <div className="flex flex-col items-start w-full">
            {activities?.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                contactId={contact.id}
              />
            ))}
          </div>
        )}
        {cascadeFollowupFormState.success && (
          <div className="text-green-600">
            {cascadeFollowupFormState.message}
          </div>
        )}
        {!cascadeFollowupFormState.success && (
          <div className="text-red-600">{cascadeFollowupFormState.message}</div>
        )}
      </CardContent>
    </Card>
  );
}
