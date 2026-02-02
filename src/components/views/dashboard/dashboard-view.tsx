"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Magnet, TrendingUp, Activity } from "lucide-react";

interface DashboardOrganisationViewProps {
  firstName?: string;
}

export default function DashboardView({
  firstName,
}: DashboardOrganisationViewProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rich-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100">
              Welcome back{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="text-slate-400 mt-1">
              Here&apos;s what&apos;s happening with your CRM today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Total Contacts
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">--</div>
                <p className="text-xs text-slate-500 mt-1">
                  Contacts in your CRM
                </p>
              </CardContent>
            </Card>

            <Card className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Lead Magnets
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Magnet className="w-5 h-5 text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">--</div>
                <p className="text-xs text-slate-500 mt-1">
                  Active lead magnets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Conversion Rate
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">--%</div>
                <p className="text-xs text-slate-500 mt-1">
                  Lead to contact rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Recent Activity
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">--</div>
                <p className="text-xs text-slate-500 mt-1">Actions this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm">
                Dashboard features coming soon. Use the sidebar to navigate to
                Contacts or Lead Magnets.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
