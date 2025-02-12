"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const userId = localStorage.getItem("userId");

  // Hide sidebar for dynamic view pages like /viewPage/[profileId]
  const hideSidebar =
    pathname.startsWith("/viewPage") ||
    ["/login", "/signup"].includes(pathname);

  console.log(pathname);
  console.log(userId);

  if (hideSidebar) return null;
  if (hideSidebar) return null;

  return <SideBar />;
  return <SideBar />;
}
