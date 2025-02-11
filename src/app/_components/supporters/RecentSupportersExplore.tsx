"use client";
import ViewPageExplore from "@/app/viewPage/[id]/page";
import ViewPage from "@/app/viewPage/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

export default function RecentSupportExplore({ creator }) {
  return (
    <div className="w-[90%]">
      <div className="w-full mx-auto mt-16 p-5 max-h-56 border border-solid rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="Avatar-Image.png" />
            <h4 className="font-semibold">{creator.name}</h4>
          </div>
          <Link href={`/viewPage/${creator?.id}`}>
            {" "}
            <button className="flex max-h-10 items-center gap-3 p-4 bg-[#f4f4f5] rounded-md">
              View profile <FiExternalLink />
            </button>
          </Link>
        </div>
        <div className="flex pt-5 gap-5">
          <div>
            <h4 className="font-bold pr-6">About Baaska</h4>
            <p className="max-w-[420px] pt-4">
              End minii tuhai ym bichih bogood bag hamt olondoo bayrlalaa gej
              helyee manai bagiinhan uneheer sain baigaa shuu
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Social Media URL</h4>
            <p className="pt-4">
              https://monkhtsolmons-organization.gitbook.io/monkhtsolmons-organization/folder-structure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
