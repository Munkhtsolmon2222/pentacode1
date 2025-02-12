"use client";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

interface Creator {
  id: string;
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
}

export default function RecentSupportExplore({
  creator,
}: {
  creator: Creator;
}) {
  return (
    <div className="w-[90%]">
      <div className="w-full mx-auto mt-16 p-5 max-h-56 border border-solid rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img className="w-6 h-6 rounded-full" src={creator?.avatarImage} />
            <h4 className="font-semibold">{creator.name}</h4>
          </div>
          <Link href={`/viewPage/${creator?.id}`}>
            <button className="flex max-h-10 items-center gap-3 p-4 bg-[#f4f4f5] rounded-md">
              View profile <FiExternalLink />
            </button>
          </Link>
        </div>
        <div className="flex pt-5 gap-5">
          <div className="lg:w-[420px] md:w-[300px]">
            <h4 className="font-bold pr-6">About {creator?.name}</h4>
            <p className="max-w-[420px] pt-4">{creator?.about}</p>
          </div>
          <div className="max-w-[420px] items-start">
            <div>
              <h4 className="font-semibold ">Social Media URL</h4>
              <p className="pt-2">{creator?.socialMediaURL}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
