"use client";
import { Transaction, User } from "@/app/constants/type";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function RecentSupport({
  transaction,
  userId,
}: {
  transaction: Transaction;
  userId: string | null;
}) {
  const [userData, setUserData] = useState<User | null>(null);
  const accessToken = Cookies.get("accessToken");

  const profileFetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/viewHome/${transaction.donorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    profileFetchData();
  }, [transaction]);

  const timeAgo = (date: string | Date): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="w-full mx-auto mt-4 p-5 border border-solid rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={userData?.avatarImage}
            alt={`${userData?.name}'s avatar`}
          />
          <div>
            <h1 className="font-semibold text-sm">{userData?.name}</h1>
            <p className="text-xs text-gray-500">
              {transaction?.socialURLOrBuyMeACoffee}
            </p>
          </div>
        </div>
        <div className="text-end">
          {transaction.donorId == userId && (
            <div>
              <h3 className="font-bold text-green-600">
                + ${transaction?.amount}
              </h3>
              <p className="text-xs text-gray-500">
                {timeAgo(transaction?.updatedAt)}
              </p>
            </div>
          )}
          {transaction.donorId !== userId && (
            <div>
              <h3 className="font-bold text-red-600">
                - ${transaction?.amount}
              </h3>
              <p className="text-xs text-gray-500">
                {timeAgo(transaction?.updatedAt)}
              </p>
            </div>
          )}
        </div>
      </div>
      {transaction?.specialMessage && (
        <p className="pt-4 text-sm text-gray-700">
          {transaction?.specialMessage}
        </p>
      )}
    </div>
  );
}
