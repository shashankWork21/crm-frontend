"use client";

import { Activity, Building, Contact } from "lucide-react";
import { TagType } from "./types";

interface TagBg {
  [key: string]: {
    bg: string;
    header: string;
    icon: React.ReactElement;
  };
}

const contactIcon = <Contact className="h-6 w-6 text-blue-800" />;
const buildingIcon = <Building className="h-6 w-6 text-green-800" />;
const activityIcon = <Activity className="h-6 w-6 text-yellow-800" />;

export const tagBGs: TagBg = {
  [TagType.CONTACT]: {
    bg: "bg-linear-to-br from-blue-200 to-blue-300",
    header: "text-blue-800",
    icon: contactIcon,
  },
  [TagType.ORGANISATION]: {
    bg: "bg-linear-to-br from-green-200 to-green-300",
    header: "text-green-800",
    icon: buildingIcon,
  },
  [TagType.ACTIVITY]: {
    bg: "bg-linear-to-br from-yellow-200 to-yellow-300",
    header: "text-yellow-800",
    icon: activityIcon,
  },
};
