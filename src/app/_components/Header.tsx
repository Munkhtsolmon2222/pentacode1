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
      <div className="py-4 flex justify-between w-[90%] mx-auto mb-4">
        <div className="flex gap-2 items-center font-bold">
          <Link href="/">
            <div className="flex gap-2 items-center font-bold h-10">
              <LuCoffee className="text-2xl" />
              Buy Me Coffee
            </div>
          </Link>
        </div>
        <div className="flex justify-between items-center max-w-[168px]">
          <div className="w-10 h-10 rounded-full flex items-center gap-2">
            <img className="rounded-full" src={userData?.avatarImage} />
            <h4>{userData?.name}</h4>
          </div>
          <h3>
            <IoIosArrowDown className="w-5 h-5" />
          </h3>
        </div>
      </div>
    </div>
  );
}
