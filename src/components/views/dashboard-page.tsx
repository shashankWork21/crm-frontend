"use client";

import { User } from "@/lib/types";
import DashboardContactsView from "./dashboard/dashboard-contacts-view";
import ProtectedRoute from "../auth/protected-route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DashboardActivitiesView from "./dashboard/dashboard-activities-view";
import { useState } from "react";

interface DashboardPageViewProps {
  organisationId: string;
  team: User[];
}

export default function DashboardPageView({
  organisationId,
  team,
}: DashboardPageViewProps) {
  const [selectedTab, setSelectedTab] = useState("activities");
  return (
    <ProtectedRoute>
      <div className="w-full px-10 mt-20 h-fit flex flex-col items-center justify-center">
        <Tabs
          className="w-full"
          defaultValue="activities"
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList>
            <TabsTrigger
              value="activities"
              className={`cursor-pointer ${
                selectedTab === "activities" ? "bg-slate-900 text-white" : ""
              }`}
            >
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className={`cursor-pointer ${
                selectedTab === "contacts" ? "bg-slate-900 text-white" : ""
              }`}
            >
              Contacts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="activities">
            <DashboardActivitiesView organisationId={organisationId} />
          </TabsContent>
          <TabsContent value="contacts">
            <DashboardContactsView
              organisationId={organisationId}
              team={team}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
