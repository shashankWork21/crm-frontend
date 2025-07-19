"use client";
import { Region, Schedule } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import RegionActions from "./region-actions";
import DateDisplay from "./date-display";

interface RegionsTableProps {
  regions: Region[];
}

export default function RegionsTable({ regions }: RegionsTableProps) {
  return (
    <Table className="w-4/5 mx-auto bg-slate-200 shadow-md text-lg">
      <TableHeader className="bg-slate-300">
        <TableRow className="border-none">
          <TableHead className="font-bold text-center">Name</TableHead>
          <TableHead className="font-bold text-center">State</TableHead>
          <TableHead className="font-bold text-center">Country</TableHead>
          <TableHead className="font-bold text-center">Call Schedule</TableHead>
          <TableHead className="font-bold text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {regions.map((region: Region) => {
          const schedules = region.schedules || [];
          return (
            <TableRow key={region.id} className="border-none">
              <TableCell className="text-center">{region.name}</TableCell>
              <TableCell className="text-center">{region.state}</TableCell>
              <TableCell className="text-center">{region.country}</TableCell>
              <TableCell className="w-fit text-center">
                {schedules.length > 0 ? (
                  <div className="flex flex-row flex-wrap items-center justify-center space-x-2">
                    {schedules.map((schedule: Schedule, index) => (
                      <div
                        key={schedule.id}
                        className="flex flex-row items-center justify-center w-fit"
                      >
                        <DateDisplay day={schedule.dayOfMonth} />
                        {index < schedules.length - 2 ? (
                          <p>,</p>
                        ) : index === schedules.length - 2 ? (
                          <p className="ml-2">and</p>
                        ) : null}
                      </div>
                    ))}{" "}
                    <p>of each month</p>
                  </div>
                ) : (
                  <span className="text-slate-600 text-xl font-semibold">
                    No Schedule
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <RegionActions
                  region={region}
                  regionId={region.id}
                  schedules={region.schedules}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
