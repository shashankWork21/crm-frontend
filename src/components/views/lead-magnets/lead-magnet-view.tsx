"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadMagnet } from "@/lib/types";
import { Download, ArrowLeft } from "lucide-react";
import { siInstagram } from "simple-icons";
import Link from "next/link";
import LeadMagnetSteps from "@/components/lead-magnet/lead-magnet-steps";

interface LeadMagnetViewProps {
  leadMagnet: LeadMagnet;
}

export default function LeadMagnetView({ leadMagnet }: LeadMagnetViewProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/lead-magnets"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lead Magnets</span>
          </Link>

          <div className="mx-auto mb-8">
            <LeadMagnetSteps currentStep={2} />
          </div>

          <Card className="w-full max-w-2xl mx-auto border border-slate-200 bg-white shadow-sm rounded-2xl py-0 overflow-hidden">
            <CardHeader className="bg-oxford-blue text-white p-8 px-6 text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                {leadMagnet.title}
              </CardTitle>
              <CardDescription className="text-white/80 text-base">
                Created by {leadMagnet.createdBy?.firstName}{" "}
                {leadMagnet.createdBy?.lastName} (
                {leadMagnet.organisation?.name})
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex flex-col items-center">
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                {leadMagnet.description}
              </p>
              <Button
                asChild
                className="bg-oxford-blue hover:bg-oxford-blue-600 mx-auto text-white font-semibold shadow-md hover:shadow-lg transition-all rounded-xl"
                size="lg"
              >
                <Link href={leadMagnet.fileUrl} target="_blank">
                  <Download className="h-5 w-5 mr-2" />
                  Download Resource
                </Link>
              </Button>
            </CardContent>
            <div className="px-8 pb-8 pt-0">
              <div className="border-t border-slate-100 pt-6">
                <Link href="/api/auth/instagram" className="block">
                  <Button className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all rounded-xl gap-2">
                    <svg
                      className="w-5 h-5"
                      role="img"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={siInstagram.path} />
                    </svg>
                    Connect Instagram
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
