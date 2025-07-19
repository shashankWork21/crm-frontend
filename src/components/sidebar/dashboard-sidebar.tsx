"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { MenuItems } from "@/components/sidebar/sidebar-menu";

interface DashboardSidebarProps {
  menuItems: MenuItems[];
}

export default function DashboardSidebar({ menuItems }: DashboardSidebarProps) {
  const groups: string[] = menuItems.reduce((acc, item) => {
    if (!acc.includes(item.group)) {
      acc.push(item.group);
    }
    return acc;
  }, [] as string[]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="mt-15">
        {groups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems
                  .filter((item) => item.group === group)
                  .map((item, index) => (
                    <SidebarMenuItem
                      key={index}
                      className="group-data-[collapsible=icon]:my-2 group-data-[collapsible=icon]:p-2 text-slate-300 font-bold hover:text-white"
                    >
                      <SidebarMenuButton
                        asChild
                        size="lg"
                        className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-2 text-lg"
                      >
                        <Link
                          className="px-6 py-5 rounded-none"
                          href={item.url}
                        >
                          <item.icon className="hover:text-white hover:bg-transparent text-slate-300" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
