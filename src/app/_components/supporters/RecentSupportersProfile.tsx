"use client";
import { Transaction, User } from "@/app/constants/type";
import { useEffect, useState } from "react";

export default function RecentSupportProfile({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [userData, setUserData] = useState<User | null>(null);

  const profileFetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/viewHome/${transaction.donorId}`,
        {
          credentials: "include",
        }
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
    <div className="w-full flex gap-3 p-2 ">
      <img className="w-10 h-10 rounded-full" src={userData?.avatarImage} />
      <div className="flex flex-col">
        <div className="w-full flex gap-2 text-lg">
          <h4 className="font-semibold text-lg">{userData?.name}</h4>
          <h4>bought ${transaction.amount} coffee</h4>
        </div>
        <h4 className="mt-1 text-lg">{transaction?.specialMessage}</h4>
      </div>
    </div>
  );
}
