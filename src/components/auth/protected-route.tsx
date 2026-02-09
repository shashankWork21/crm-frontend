"use client";

import { useAuth } from "@/context/auth.context";
import {
  adminMenuItems,
  employeeMenuItems,
  MenuItems,
  reviewerMenuItems,
} from "@/components/sidebar/sidebar-menu";
import { Role } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import DashboardSidebar from "../sidebar/dashboard-sidebar";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router, pathName]);

  const menuItems: MenuItems[] =
    user?.role === Role.REVIEWER
      ? reviewerMenuItems
      : user?.role === Role.EMPLOYEE
        ? employeeMenuItems
        : adminMenuItems;

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <DashboardSidebar menuItems={menuItems} user={user} />
      <main className="w-full min-h-screen bg-rich-black">
        <SidebarTrigger className="cursor-pointer text-slate-400 hover:text-slate-200" />
        {children}
      </main>
    </SidebarProvider>
  );
}
