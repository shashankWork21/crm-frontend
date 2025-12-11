"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  useSidebar,
} from "../ui/sidebar";
import { MenuItems } from "@/components/sidebar/sidebar-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ChevronUp, LogOut, User2, CreditCard, Sparkles } from "lucide-react";
import { User } from "@/lib/types";
import { logoutUser } from "@/actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface DashboardSidebarProps {
  user: User;
  menuItems: MenuItems[];
}

export default function DashboardSidebar({
  user,
  menuItems,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const groups: string[] = menuItems.reduce((acc, item) => {
    if (!acc.includes(item.group)) {
      acc.push(item.group);
    }
    return acc;
  }, [] as string[]);

  const isActiveRoute = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      {/* Header */}
      <SidebarHeader className="px-4 py-4 bg-oxford-blue border-b border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-6 h-6 text-sunglow-500 shrink-0" />
          {!isCollapsed && (
            <span className="text-lg font-bold whitespace-nowrap">
              Smart CRM
            </span>
          )}
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-oxford-blue px-2 py-4">
        {groups.map((group, index) => (
          <SidebarGroup key={index} className="mb-2 p-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="text-white/40 text-xs uppercase tracking-wider font-semibold px-3 mb-2">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems
                  .filter((item) => item.group === group)
                  .map((item, idx) => {
                    const isActive = isActiveRoute(item.url);
                    const menuButton = (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          relative rounded-xl transition-all duration-200 h-10
                          ${
                            isActive
                              ? "bg-sunglow-500/10 text-sunglow-500 hover:bg-sunglow-500/15"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }
                          ${isCollapsed ? "justify-center px-0" : "px-3"}
                        `}
                      >
                        <Link
                          href={item.url}
                          className={`flex items-center gap-3 w-full ${
                            isCollapsed ? "justify-center" : ""
                          }`}
                        >
                          <item.icon
                            className={`w-5 h-5 shrink-0 ${
                              isActive ? "text-sunglow-500" : "text-white/50"
                            }`}
                          />
                          {!isCollapsed && (
                            <>
                              <span className="font-medium">{item.title}</span>
                              {isActive && (
                                <span
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sunglow-500 rounded-r-full"
                                  aria-hidden="true"
                                />
                              )}
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    );

                    return (
                      <SidebarMenuItem key={idx}>
                        {isCollapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {menuButton}
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="bg-oxford-blue border-white/10 text-white"
                            >
                              {item.title}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          menuButton
                        )}
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 bg-oxford-blue border-t border-white/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={`
                    w-full rounded-xl hover:bg-white/5 transition-colors py-2
                    ${isCollapsed ? "justify-center px-0" : "px-2"}
                  `}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sunglow-400 to-sunglow-600 flex items-center justify-center text-rich-black font-bold text-sm shrink-0">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </div>
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-white/50 truncate">
                            {user.email}
                          </p>
                        </div>
                        <ChevronUp className="w-4 h-4 text-white/40 shrink-0" />
                      </>
                    )}
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align={isCollapsed ? "center" : "start"}
                className="w-56 bg-oxford-blue border border-white/10 rounded-xl shadow-xl"
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-white/50">{user.email}</p>
                </div>
                <div className="p-1">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                      <User2 className="w-4 h-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="p-1">
                  <DropdownMenuItem asChild>
                    <form action={logoutUser} className="w-full">
                      <button
                        type="submit"
                        className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </form>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
