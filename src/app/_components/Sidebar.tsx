import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function SideBar() {
  return (
    <div className="fixed left-10 top-0 h-full w-[20%] bg-gray-primary text-black p-4">
      <div className="pt-4 font-bold">
        <div className="mt-12">
          <Link href="/home">
            <div className="block p-4 rounded-md transition-all duration-200 hover:bg-[#F4F4F5] active:scale-95">
              Home
            </div>
          </Link>
          <Link href="/explore">
            <div className="block p-4 rounded-md transition-all duration-200 hover:bg-[#F4F4F5] active:scale-95">
              Explore
            </div>
          </Link>
          <Link href="/viewPage">
            <div className="flex items-center gap-2 p-4 rounded-md transition-all duration-200 hover:bg-[#F4F4F5] active:scale-95">
              <span>View page</span>
              <ExternalLink />
            </div>
          </Link>

          <Link href="/accountSettings">
            <div className="block p-4 rounded-md transition-all duration-200 hover:bg-[#F4F4F5] active:scale-95">
              Account settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
