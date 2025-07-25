"use client";

import { useAuth } from "@/context/auth.context";
import {
  adminMenuItems,
  employeeMenuItems,
  MenuItems,
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
    let redirectTimeout: NodeJS.Timeout | null = null;

    if (!user && !loading) {
      redirectTimeout = setTimeout(() => {
        router.push("/login");
      }, 1000);
    }

    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [user, loading, router, pathName]);

  const menuItems: MenuItems[] =
    user?.role === Role.ADMIN ? adminMenuItems : employeeMenuItems;

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <DashboardSidebar menuItems={menuItems} />
      <main className="w-full min-h-screen ">
        <SidebarTrigger className="cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  );
}
