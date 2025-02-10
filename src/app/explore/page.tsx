"use client";
import { useState } from "react";
import RecentSupportExplore from "../_components/supporters/RecentSupportersExplore";
import { SearchIcon, UserIcon } from "lucide-react";

export default function Explore() {
  const [creators, setCreators] = useState();

  return (
    <div className="w-full px-2 min-h-screen flex">
      <div className="w-[300px]">sidebar</div>
      {/* <div className="w-full gap-6 flex flex-col ">
        <h4 className="text-xl font-bold text-[#18181B]">Explore Creators</h4>
        <div className="w-[243px] mt-4 pl-2 flex items-center border rounded-lg">
          <SearchIcon className="text-[#71717A]" />
          <input
            type="text"
            placeholder="Search name"
            className="outline-none pl-2 text-[#71717A] min-w[243px] h-[36px]"
          />
        </div>
      </div> */}
      {/* {creators ? ( */}
      <div className="w-full m-20">
        <RecentSupportExplore />
      </div>
      {/* ) : ( */}
      {/* //   <div className=" mt-10 p-6 rounded-lg flex justify-center items-center">
      //     <div className="max-w-[385px] flex flex-col items-center justify-center gap-[20px]">
      //       <div className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-[64px] h-[64px] ">
      //         <UserIcon />
      //       </div>
      //       <p className=" text-lg">No creators have signed up yet</p>
      //     </div>
      //   </div>
      // )} */}
    </div>
  );
}
