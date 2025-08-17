"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Building,
  Calendar,
  CheckCircle,
  Mail,
  Map,
  MapPin,
  Phone,
  User as UserIcon,
  Clock,
} from "lucide-react";

import { Activity, Contact, User } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ContactActions from "./contact-actions";
import { formatDate } from "@/lib/date";
import ActivityCard from "../activity/activity-card";
import { cascadeFollowup } from "@/actions/contact";
import { toTitleCase } from "@/lib/utils";

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
  const [showMessage, setShowMessage] = useState(false);

  const handleViewActivitiesClick = async () => {
    setViewActivities(!viewActivities);
    const fetchedActivities = await activityFetchFunction();
    setActivities(fetchedActivities);
  };

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
      setShowMessage(true);
      successCallback?.();

      // Auto-hide message after 2 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [cascadeFollowupFormState.success, successCallback]);

  const getContactTypeBadge = () => {
    const colors = {
      LEAD: "bg-blue-100 text-blue-800 border-blue-200",
      PROSPECT: "bg-yellow-100 text-yellow-800 border-yellow-200",
      CUSTOMER: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[contact.contactType] || colors.LEAD;
  };

  const getLeadSegmentBadge = () => {
    if (!contact.leadSegment) return null;
    const colors = {
      HOT: "bg-red-100 text-red-800 border-red-200",
      WARM: "bg-orange-100 text-orange-800 border-orange-200",
      COLD: "bg-slate-100 text-slate-800 border-slate-200",
    };
    return colors[contact.leadSegment];
  };

  return (
    <Card className="p-0 w-full max-w-6xl mx-auto mt-6 shadow-lg bg-blue-100 hover:shadow-xl transition-shadow duration-300 border-none relative rounded-lg">
      <div className="absolute left-1 rounded-l-lg top-0 h-full w-1 bg-blue-600" />
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="text-slate-900 p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {toTitleCase(contact?.name)}
                  </h2>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      className={`${getContactTypeBadge()} border text-xs`}
                    >
                      {contact.contactType}
                    </Badge>
                    {contact.leadSegment && (
                      <Badge
                        className={`${getLeadSegmentBadge()} border text-xs`}
                      >
                        {contact.leadSegment}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-md font-bold">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phoneNumber}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.alternateNumber &&
                  contact.alternateNumber !== "undefined" && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 opacity-70" />
                      <span className="opacity-90">
                        {contact.alternateNumber}
                      </span>
                    </div>
                  )}
              </div>
            </div>

            <ContactActions
              contact={contact}
              team={team}
              successCallback={successCallback}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Follow-up Information */}
          {contact.followUpFrequency && contact.followUpOn && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Follow-up every {contact.followUpFrequency} days
                    </p>
                    {contact.assignedTo && (
                      <p className="text-sm text-slate-600">
                        Assigned to {contact.assignedTo.firstName}{" "}
                        {contact.assignedTo.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(contact.followUpOn).day}
                      <sup>{formatDate(contact.followUpOn).suffix}</sup>{" "}
                      {formatDate(contact.followUpOn).month},{" "}
                      {formatDate(contact.followUpOn).year}
                    </span>
                  </div>

                  <form action={cascadeFollowupAction}>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Follow up Complete
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Organization & Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <Building className="h-5 w-5 text-slate-500" />
                <p className="text-sm text-slate-500">Organization</p>
              </div>
              <div className="flex items-start gap-3">
                <p className="font-medium text-slate-900">
                  {contact.branch?.organisation?.name || "No Organization"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <Map className="h-5 w-5 text-slate-500" />
                <p className="text-sm text-slate-500">Region</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {contact.branch?.region?.name},{" "}
                  {contact.branch?.region?.state}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-1">
                <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                <p className="text-sm text-slate-500">Address</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {contact.branch?.address && `${contact.branch.address}, `}
                  {contact.branch?.city}
                  {contact.branch?.postalCode &&
                    `, ${contact.branch.postalCode}`}
                </p>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Activities Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Activities</h3>
            <Button
              variant="outline"
              onClick={handleViewActivitiesClick}
              className="text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {viewActivities ? "Hide Activities" : "View Activities"}
            </Button>
          </div>

          {viewActivities && (
            <div className="space-y-3">
              {activities?.length > 0 ? (
                activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    contactId={contact.id}
                  />
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">
                  No activities found
                </p>
              )}
            </div>
          )}

          {/* Status Messages */}
          {cascadeFollowupFormState.message && showMessage && (
            <div
              className={`mt-4 p-3 rounded-lg transition-opacity duration-300 ${
                cascadeFollowupFormState.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {cascadeFollowupFormState.message}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
