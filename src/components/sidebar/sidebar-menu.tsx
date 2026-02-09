import {
  Users,
  Building2,
  BookUser,
  UserCircle,
  Tag,
  Building,
  LayoutDashboard,
  Magnet,
} from "lucide-react";
import { siInstagram } from "simple-icons/icons";

function InstagramBrandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Instagram"
      fill="currentColor"
      {...props}
    >
      <path d={siInstagram.path} />
    </svg>
  );
}

const adminItemsOnly = [
  {
    group: "Admin",
    title: "Your Organisation",
    url: "/dashboard/organisation",
    icon: Building,
  },

  { group: "Admin", title: "Manage Tags", url: "/dashboard/tags", icon: Tag },
  { group: "Admin", title: "Team", url: "/dashboard/team", icon: Users },
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
    url: "/contacts",
    icon: BookUser,
  },
  {
    group: "Contacts",
    title: "Organisations",
    url: "/dashboard/contacts/organisation",
    icon: Building2,
  },
  {
    group: "Lead Generation",
    title: "Lead Magnets",
    url: "/lead-magnets",
    icon: Magnet,
  },

  { group: "Self", title: "Profile", url: "/profile", icon: UserCircle },
];

export const adminMenuItems = [...employeeMenuItems, ...adminItemsOnly];

export const reviewerMenuItems = [
  {
    group: "Review",
    title: "Instagram",
    url: "/instagram-review",
    icon: InstagramBrandIcon,
  },
];

export interface MenuItems {
  group: string;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
