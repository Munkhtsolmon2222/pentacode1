"use client";
import { useState } from "react";
import RecentSupportExplore from "../_components/supporters/RecentSupportersExplore";
import { SearchIcon, UserIcon } from "lucide-react";

export default function Explore() {
  const [creators, setCreators] = useState();

  return (
    <div className="w-[80%] fixed right-0 top-0 h-full bg-gray-primary text-black p-4">
      {/* <div className="max-w-[909px] gap-6">
        <h4 className="text-xl font-bold text-[#18181B]">Explore Creators</h4>
        <div className="w-[243px] mt-4 pl-2 flex items-center border rounded-lg">
          <SearchIcon className="text-[#71717A]" />
          <input
            type="text"
            placeholder="Search name"
            className="outline-none pl-2 text-[#71717A] min-w[243px] h-[36px]"
          />
        </div>
      </div>
      {creators ? ( */}
      <RecentSupportExplore />
      {/* //   ) : (
    //     <div className=" mt-10 p-6 rounded-lg ">
    //       <div className="max-w-[385px] flex flex-col items-center justify-center gap-[20px]">
    //         <div className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-[64px] h-[64px] ">
    //           <UserIcon />
    //         </div>
    //         <p className=" text-lg">No creators have signed up yet</p>
    //       </div>
    //     </div>
    //   )} */}
    </div>
  );
}
