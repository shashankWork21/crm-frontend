import {
  Users,
  Building2,
  Map,
  BookUser,
  UserCircle,
  Tag,
  Building,
  LayoutDashboard,
} from "lucide-react";

const adminItemsOnly = [
  {
    group: "Admin",
    title: "Your Organisation",
    url: "/dashboard/organisation",
    icon: Building,
  },

  { group: "Admin", title: "Manage Tags", url: "/dashboard/tags", icon: Tag },
  { group: "Admin", title: "Team", url: "/dashboard/team", icon: Users },
  { group: "Admin", title: "Regions", url: "/dashboard/regions", icon: Map },
];

export const employeeMenuItems = [
  {
    group: "Contacts",
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    group: "Contacts",
    title: "Contacts",
    url: "/dashboard/contacts",
    icon: BookUser,
  },
  {
    group: "Contacts",
    title: "Organisations",
    url: "/dashboard/contacts/organisation",
    icon: Building2,
  },

  { group: "Self", title: "Profile", url: "/profile", icon: UserCircle },
];

export const adminMenuItems = [...employeeMenuItems, ...adminItemsOnly];

export interface MenuItems {
  group: string;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
