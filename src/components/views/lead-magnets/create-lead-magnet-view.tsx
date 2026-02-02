"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import CreateaLeadMagnetForm from "@/components/lead-magnet/create-lead-magnet-form";
import LeadMagnetSteps from "@/components/lead-magnet/lead-magnet-steps";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Magnet, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateLeadMagnetView() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rich-black">
        <div className="container mx-auto px-6 py-8">
          {/* Back Button */}
          <Link
            href="/lead-magnets"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lead Magnets</span>
          </Link>

          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-sunglow-500 flex items-center justify-center shadow-md">
                <Magnet className="h-7 w-7 text-rich-black" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Create Lead Magnet
            </h1>
            <p className="text-slate-400">
              Create a new lead magnet to capture more leads
            </p>
          </div>
          <LeadMagnetSteps currentStep={1} />

          {/* Main Form Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-sm border border-slate-700 bg-oxford-blue rounded-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-semibold text-slate-100">
                  Lead Magnet Details
                </CardTitle>
              </CardHeader>
              <CreateaLeadMagnetForm />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
