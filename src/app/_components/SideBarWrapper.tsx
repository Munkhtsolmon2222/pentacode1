"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "./Sidebar";

export default function SidebarWrapper() {
	const pathname = usePathname();

	const hideSidebar =
		pathname.startsWith("/viewPage") ||
		["/login", "/signup", "/forgot-password"].includes(pathname);

	if (hideSidebar) return null;
	if (hideSidebar) return null;

	return <SideBar />;
}
