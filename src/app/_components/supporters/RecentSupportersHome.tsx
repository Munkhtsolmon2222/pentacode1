"use client";
import { Transaction, User } from "@/app/constants/type";
import { useEffect, useState } from "react";

export default function RecentSupport({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [userData, setUserData] = useState<User | null>(null);

  const profileFetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/profile/viewHome/${transaction.donorId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      console.log(resJson);
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    profileFetchData();
  }, [transaction]);
  console.log(userData);

  return (
    <div>
      <div className=" mx-auto mt-4 pl-9 pt-7 flex justify-between">
        <div className="w-10 h-10 rounded-full flex gap-2 items-center">
          <img
            className="rounded-full h-10 w-10"
            src={userData?.avatarImage}
            alt="User Avatar"
          />
          <div className="">
            <h1 className="text-[#71717A] text-xs">{userData?.name}</h1>
            <h3 className="text-[#71717A] text-xs">
              {transaction?.socialURLOrBuyMeACoffee}
            </h3>
          </div>
        </div>
        <div className="text-end">
          <h3 className="font-bold">+ ${transaction?.amount}</h3>
          <h4 className="text-[#71717A] text-xs">{transaction?.updatedAt}</h4>
        </div>
      </div>
      <p className=" pl-9 pt-4 mx-auto items-start">
        {transaction?.specialMessage}
      </p>
    </div>
  );
}
