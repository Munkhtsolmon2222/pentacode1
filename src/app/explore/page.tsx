"use client";
import { useEffect, useState } from "react";
import RecentSupportExplore from "../_components/supporters/RecentSupportersExplore";
import { SearchIcon, UserIcon } from "lucide-react";

type Creator = {
  id: string;
  name: string;
  avatarImage: string;
  about: string;
  socialMediaURL: string;
};
export default function Explore() {
  const [creators, setCreators] = useState<Creator[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/profile/explore`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      setCreators(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(creators);
  return (
    <div className="w-[80%] fixed right-0 top-0 ml-8 h-screen bg-gray-primary text-black p-4 overflow-y-auto custom-scrollbar">
      <div className="w-full gap-6 flex flex-col mt-10">
        <h4 className="text-2xl font-bold text-[#18181B] mt-10">
          Explore creators
        </h4>
        <div className="w-[243px] mt-4 pl-2 flex items-center border rounded-lg">
          <SearchIcon className="text-[#71717A]" />
          <input
            type="text"
            placeholder="Search name"
            className="outline-none pl-2 text-[#71717A] min-w-[243px] h-[36px]"
          />
        </div>
      </div>
      {creators ? (
        <div className="w-full gap-6">
          {creators?.map((creator: Creator) => (
            <RecentSupportExplore key={creator?.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className=" mt-10 p-6 rounded-lg flex justify-center items-center">
          <div className="max-w-[385px] flex flex-col items-center justify-center gap-[20px]">
            <div className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-[64px] h-[64px] ">
              <UserIcon />
            </div>
            <p className=" text-lg">No creators have signed up yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
