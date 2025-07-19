"use client";

import { UserProvider } from "@/context/auth.context";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}
