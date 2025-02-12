"use client";
import { Creator, Transaction, User } from "@/app/constants/type";
import { useEffect, useState } from "react";

export default function RecentSupport({
  transaction,
}: {
  transaction: Transaction;
}) {
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
    <div className="w-[50%] gap-4 p-4 ">
      <div className="flex justify-between pt-9 pl-9">
        <div className="w-6 h-6 rounded-full flex gap-3 items-center">
          <img src={transaction?.avatarImage} />
          <div>
            <h1>{transaction?.name}</h1>
            <h3> {transaction?.socialMediaURL}</h3>
          </div>
        </div>
        <div>
          <h3>{transaction?.amount}</h3>
          <h4 className="text-[#71717A] text-xs">{transaction?.updatedAt}</h4>
        </div>
      </div>
      <p className="pt-4 pl-9">{transaction?.about}</p>
    </div>
  );
}
