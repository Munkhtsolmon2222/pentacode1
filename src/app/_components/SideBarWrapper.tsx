"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const userId = localStorage.getItem("userId");
  const hideSidebar = [
    "/viewPage",
    "/login",
    "/signup",
    `/viewPage/${userId}`,
  ].includes(pathname);

  if (hideSidebar) return null;

  return <SideBar />;
}
