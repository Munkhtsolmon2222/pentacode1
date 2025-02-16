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
        `http://localhost:5000/profile/viewHome/${transaction.donorId}`,
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

  useEffect(() => {
    profileFetchData();
  }, [transaction]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <h3 className="font-bold text-green-600">+ ${transaction?.amount}</h3>
          <p className="text-xs text-gray-500">
            {formatDate(transaction?.updatedAt)}
          </p>
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
