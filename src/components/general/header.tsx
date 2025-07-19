"use client";

import Link from "next/link";
import HeaderAuth from "../auth/header-auth";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950 shadow w-full flex flex-row items-center justify-between px-10 py-3">
      <Link
        href="/"
        className="ml-16 text-2xl font-bold text-slate-100 cursor-pointer"
      >
        CRM
      </Link>
      <HeaderAuth />
    </header>
  );
}
