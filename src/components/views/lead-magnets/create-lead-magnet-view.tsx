"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import CreateaLeadMagnetForm from "@/components/lead-magnet/create-lead-magnet-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Magnet, FileText, Users } from "lucide-react";

export default function CreateLeadMagnetView() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-powder-blue/5">
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-sunglow/20 p-3 rounded-full">
                <Magnet className="h-8 w-8 text-oxford-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-oxford-blue mb-2">
              Create Lead Magnet
            </h1>
            <p className="text-lg text-oxford-blue/70 max-w-2xl mx-auto">
              Transform visitors into leads with compelling resources that
              provide real value
            </p>
          </div>

          {/* Info Cards */}
          {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-powder-blue/20 shadow-sm hover:shadow-md transition-shadow bg-powder-blue">
              <CardHeader className="text-center pb-4">
                <FileText className="h-8 w-8 text-oxford-blue mx-auto mb-3" />
                <CardTitle className="text-lg text-oxford-blue">
                  Create Lead Magnet
                </CardTitle>
                <CardDescription className="text-sm">
                  Create a resource that solve real problems for your audience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-powder-blue/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <Users className="h-8 w-8 text-oxford-blue mx-auto mb-3" />
                <CardTitle className="text-lg text-oxford-blue">
                  Capture Leads
                </CardTitle>
                <CardDescription className="text-sm">
                  Exchange valuable content for contact information
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-powder-blue/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <Magnet className="h-8 w-8 text-oxford-blue mx-auto mb-3" />
                <CardTitle className="text-lg text-oxford-blue">
                  Build Relationships
                </CardTitle>
                <CardDescription className="text-sm">
                  Start meaningful conversations with potential customers
                </CardDescription>
              </CardHeader>
            </Card>
          </div> */}

          {/* Main Form Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-powder-blue/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-oxford-blue">
                  Lead Magnet Details
                </CardTitle>
                <CardDescription className="text-oxford-blue/70">
                  Fill out the information below to create your new lead magnet
                </CardDescription>
              </CardHeader>
              <CreateaLeadMagnetForm />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
