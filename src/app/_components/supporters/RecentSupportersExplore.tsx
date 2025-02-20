"use client";
import { Creator } from "@/app/constants/type";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function RecentSupportExplore({
  creator,
}: {
  creator: Creator;
}) {
  return (
    <div className="w-[80%] mx-auto mt-6 p-8 max-h-56 border border-solid rounded-lg">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={creator?.avatarImage}
              alt={`${creator.name}'s avatar`}
            />
            <h4 className="font-semibold text-lg">{creator.name}</h4>
          </div>
          <Link href={`/viewPage/${creator?.id}`}>
            <button className="flex items-center gap-2 p-2 bg-[#f4f4f5] rounded-md hover:bg-[#e4e4e7] transition-colors">
              View profile <FiExternalLink className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-bold text-md">About {creator?.name}</h4>
            <p className="pt-2 text-md text-gray-600">{creator?.about}</p>
          </div>
          <div className="">
            <h4 className="font-semibold text-md">Social Media URL</h4>
            <p className="pt-2 text-md text-gray-600">
              {creator?.socialMediaURL}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
