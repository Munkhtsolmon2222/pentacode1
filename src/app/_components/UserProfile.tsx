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
import { useEffect, useState } from "react";
import { User } from "../constants/type";
import RecentSupport from "./supporters/RecentSupportersHome";
export default function UserProfile() {
  const [userData, setUserData] = useState<User>();
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/profile/currentuser/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(userData);

  return (
    <div className="w-full bg-gray-primary text-black p-4">
      <div className="max-w-[80%]  mx-auto mt-16 p-5 border border-solid rounded-lg">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-full flex gap-3 items-center">
            <img src={userData?.avatarImage} className="rounded-full" />
            <div className="flex flex-col">
              <h4 className="font-semibold">{userData?.name}</h4>
              <a className="text-sm">{userData?.socialMediaURL}</a>
            </div>
          </div>
          <button className="flex max-h-10 items-center text-white gap-3 p-4 bg-[#18181B] rounded-md">
            <LuCopy /> Share page link
          </button>
        </div>
        <div className="max-w-[80%] mx-auto border border-solid bg-[#E4E4E7] mt-6"></div>
        <div className="flex items-center gap-4 pt-7">
          <h4 className="font-bold text-2xl">Earning</h4>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue className="text-lg" placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Last 30 days</SelectItem>
                <SelectItem value="banana">last 90 days</SelectItem>
                <SelectItem value="blueberry">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-4xl size-9 pt-6 pb-10 ">$450</p>
      </div>
    </div>
  );
}
