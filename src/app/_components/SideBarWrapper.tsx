"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hideSidebar = ["/viewPage", "/login", "/signup"].includes(pathname);

  if (hideSidebar) return null;

  return <SideBar />;
}
