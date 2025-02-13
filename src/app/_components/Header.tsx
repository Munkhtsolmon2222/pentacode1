"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuCoffee } from "react-icons/lu";
import { User } from "../constants/type";
import { IoIosArrowDown } from "react-icons/io";
export default function Header() {
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
    <div>
      <div className="py-4 flex justify-between w-[90%] mx-auto mb-4 px-4">
        <div className="flex gap-2 items-center font-bold">
          <Link href="/">
            <div className="flex gap-2 items-center font-bold h-10">
              <LuCoffee className="text-2xl" />
              Buy Me Coffee
            </div>
          </Link>
        </div>

        {/* <button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center overflow-hidden">
              <img
                className="rounded-full w-full h-full object-cover"
                src={userData?.avatarImage}
                alt={userData?.name || "User avatar"}
              />
            </div>
            <h4 className="text-sm font-medium">{userData?.name}</h4>
            <IoIosArrowDown className="cursor-pointer" />
          </div>
        </button> */}
        <button className="bg-[#F4F4F5] rounded-md max-w-20 text-sm p-3 cursor-pointer hover:bg-gray-300">
          Log out
        </button>
      </div>
    </div>
  );
}
