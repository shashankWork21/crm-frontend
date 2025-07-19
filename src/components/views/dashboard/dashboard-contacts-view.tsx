"use client";

import { useEffect, useState } from "react";
import { Contact, DashboardContactView, DateOptions, User } from "@/lib/types";
import {
  getContactsByRegionSchedule,
  getOverdueFollowUps,
  getUpcomingFollowUps,
} from "@/db/contact.queries";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/general/date-picker";
import ContactCardView from "@/components/contacts/contact-card-view";

interface DashboardContactsViewProps {
  organisationId: string;
  team: User[];
}

export default function DashboardContactsView({
  organisationId,
  team,
}: DashboardContactsViewProps) {
  const [contactView, setContactView] = useState<DashboardContactView>(
    DashboardContactView.REGION_FOLLOW_UPS
  );
  const [date, setDate] = useState<Date>(new Date());
  const [viewDatePicker, setViewDatePicker] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function fetchContacts() {
      let contactsData;
      switch (contactView) {
        case DashboardContactView.REGION_FOLLOW_UPS:
          contactsData = await getContactsByRegionSchedule(
            organisationId,
            date.getDate()
          );
          setContacts(contactsData);
          break;

        case DashboardContactView.UPCOMING_FOLLOWUPS:
          contactsData = await getUpcomingFollowUps(organisationId);
          setContacts(contactsData);
          break;

        case DashboardContactView.OVERDUE_FOLLOWUPS:
          contactsData = await getOverdueFollowUps(organisationId);
          setContacts(contactsData);
          break;

        default:
          contactsData = await getContactsByRegionSchedule(
            organisationId,
            date.getDate()
          );
          setContacts(contactsData);
          break;
      }
    }
    fetchContacts();
  }, [contactView, date, organisationId]);

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <div className="bg-white max-w-6xl mx-auto rounded-lg border shadow-sm p-6 space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700">Follow Up Type</h3>
          <RadioGroup
            defaultValue={DashboardContactView.REGION_FOLLOW_UPS}
            onValueChange={(value) =>
              setContactView(value as DashboardContactView)
            }
            className="flex flex-wrap gap-6"
          >
            {Object.values(DashboardContactView).map((view, index) => (
              <div key={view} className="flex items-center space-x-2">
                <RadioGroupItem value={view} id={`view-${index}`} />
                <Label
                  htmlFor={`view-${index}`}
                  className="text-sm font-medium text-slate-900 cursor-pointer"
                >
                  {view
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {contactView === DashboardContactView.REGION_FOLLOW_UPS && (
          <div className="space-y-3">
            <div className="flex items-center gap-6">
              <RadioGroup
                defaultValue={DateOptions.TODAY}
                onValueChange={(value) => {
                  const selectedDate = new Date();
                  if (value === DateOptions.TODAY) {
                    selectedDate.setHours(0, 0, 0, 0);
                  }
                  if (value === DateOptions.TOMORROW) {
                    selectedDate.setDate(selectedDate.getDate() + 1);
                  } else if (value === DateOptions.CUSTOM) {
                    setViewDatePicker(true);
                    return;
                  }
                  setDate(selectedDate);
                }}
                className="flex gap-6"
              >
                {Object.values(DateOptions).map((option, index) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      key={option}
                      value={option}
                      id={`date-option-${index}`}
                    />
                    <Label
                      htmlFor={`date-option-${index}`}
                      className="text-sm font-medium text-slate-900 cursor-pointer"
                    >
                      {option.charAt(0).toUpperCase() +
                        option.slice(1).toLowerCase()}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {viewDatePicker && (
                <div className="ml-4">
                  <DatePicker
                    label=""
                    date={date}
                    setDate={(date) => setDate(date || new Date())}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[400px]">
        {contacts.length > 0 ? (
          <ContactCardView contacts={contacts} team={team} />
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-64 bg-white rounded-lg border shadow-sm">
            <div className="text-center space-y-2">
              <div className="h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900">
                No contacts found
              </h3>
              <p className="text-sm text-slate-500">
                Try adjusting your filters or check back later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
