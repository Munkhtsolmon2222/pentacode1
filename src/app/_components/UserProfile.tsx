"use client";
import { LuCopy } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "../constants/type";
import { useEffect, useState } from "react";
import RecentSupport from "./supporters/RecentSupportersHome";
import { getUserId } from "@/utils/userId";

export default function UserProfile() {
  const [userData, setUserData] = useState<User | null>(null);
  const [totalValue, setTotalValue] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>();
  const [userValue, setUserValue] = useState({
    totalEarnings30Days: 0,
    totalEarnings90Days: 0,
    totalEarningsAllTime: 0,
  });

  useEffect(() => {
    getUserId().then((userId) => {
      setUserId(userId);
    });
  }, []);
  useEffect(() => {
    fetchData();
    fetchTotalEarnings();
  }, [userId]);
  const fetchData = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/profile/currentuser/${userId}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalEarnings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/donation/total-earnings/${userId}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch earnings data");
      const resJson = await response.json();
      setUserValue({
        totalEarnings30Days: resJson.totalEarnings30Days,
        totalEarnings90Days: resJson.totalEarnings90Days,
        totalEarningsAllTime: resJson.totalEarningsAllTime,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const userLink = `http://localhost:3000/user/${userId}`;
  const handleShareLink = () => {
    navigator.clipboard
      .writeText(userLink)
      .then(() => {
        alert("Link huulagdlaa");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const renderEarnings = () => {
    if (totalValue === "30day") {
      return `$${userValue.totalEarnings30Days || "0"}`;
    } else if (totalValue === "90days") {
      return `$${userValue.totalEarnings90Days || "0"}`;
    } else if (totalValue === "Alltime") {
      return `$${userValue.totalEarningsAllTime || "0"}`;
    }
    return "$0";
  };

  return (
    <div className="w-full bg-gray-primary text-black p-4">
      <div className="max-w-[80%] mx-auto mt-16 p-5 border border-solid rounded-lg">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-full flex gap-3 items-center">
            <img src={userData?.avatarImage} className="rounded-full" />
            <div className="flex flex-col">
              <h4 className="font-semibold">{userData?.name}</h4>
              <a className="text-sm">{userData?.socialMediaURL}</a>
            </div>
          </div>
          <button
            onClick={handleShareLink}
            className="flex max-h-10 items-center text-white gap-3 p-4 bg-[#18181B] rounded-md"
          >
            <LuCopy /> Share page link
          </button>
        </div>
        <div className="max-w-[80%] mx-auto border border-solid bg-[#E4E4E7] mt-6"></div>
        <div className="flex items-center gap-4 pt-7">
          <h4 className="font-bold text-2xl">Earning</h4>
          <Select onValueChange={setTotalValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue className="text-lg" placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30day">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="Alltime">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-4xl size-9 pt-6 pb-10">
          {renderEarnings()}
        </p>
      </div>
    </div>
  );
}
