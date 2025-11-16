"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { MenuItems } from "@/components/sidebar/sidebar-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { User } from "@/lib/types";
import { logoutUser } from "@/actions";

interface DashboardSidebarProps {
  user: User;
  menuItems: MenuItems[];
}

export default function DashboardSidebar({
  user,
  menuItems,
}: DashboardSidebarProps) {
  const groups: string[] = menuItems.reduce((acc, item) => {
    if (!acc.includes(item.group)) {
      acc.push(item.group);
    }
    return acc;
  }, [] as string[]);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-6 py-4 bg-oxford-blue text-2xl font-bold text-white group-data-[collapsible=icon]:hidden">
        Smart CRM
      </SidebarHeader>
      <SidebarContent className="bg-oxford-blue text-white">
        {groups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-white">
              {group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems
                  .filter((item) => item.group === group)
                  .map((item, index) => (
                    <SidebarMenuItem
                      key={index}
                      className="text-white hover:text-rich-black"
                    >
                      <SidebarMenuButton
                        asChild
                        size="default"
                        className="group-data-[collapsible=icon]:[&>svg]:mr-2 text-sm hover:bg-powder-blue hover:text-rich-black"
                      >
                        <Link
                          className="px-6 rounded-none hover:bg-powder-blue"
                          href={item.url}
                        >
                          <item.icon className="hover:text-rich-black hover:bg-transparent text-white" />
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
      <SidebarFooter className="px-6 py-4 bg-oxford-blue text-white group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-powder-blue">
                  <User2 className="text-white" /> {user.firstName}{" "}
                  {user.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-powder-blue"
              >
                <DropdownMenuItem>
                  <Link href="/profile">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form action={logoutUser}>
                    <button type="submit">Logout</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
