"use client";

import { Branch, BranchType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LandPlot, MapPin } from "lucide-react";
import BranchActions from "./branch-actions";

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  return (
    <Card className="w-1/3 border-none bg-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle
          className={`${
            branch.type === BranchType.HEADQUARTERS
              ? "font-semibold text-slate-800"
              : "text-slate-700"
          } text-2xl`}
        >
          {branch.type.charAt(0).toUpperCase() +
            branch.type.slice(1).toLowerCase()}
        </CardTitle>
        <BranchActions branch={branch} />
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <div className="flex flex-row items-center space-x-2 mb-8">
          <p className="text-xl">
            <span className="font-semibold">Region: </span>
            {branch.region?.name}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <MapPin />
          <p className="text-lg">{branch.address}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <LandPlot />
          <p className="text-lg">
            {branch.city} {branch.postalCode}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
