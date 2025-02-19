"use client";
import { useEffect, useState } from "react";
import { Transaction, User } from "../constants/type";
import UserProfile from "../_components/UserProfile";
import { Checkbox } from "@/components/ui/checkbox";
import RecentSupport from "../_components/supporters/RecentSupportersHome";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accessToken } from "@/utils/accessToken";
import { HomeSkeleton } from "../_components/skeletons/HomeSkeleton";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId: string | null = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  console.log("User ID:", userId);

  const fetchData = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/received/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user data");

      const resJson = await res.json();
      console.log("API Response:", resJson);

      setTransactions(
        Array.isArray(resJson.donations) ? resJson.donations : []
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };
  const filteredTransactions = selectedAmount
    ? transactions.filter(
        (transaction) => `$${transaction.amount}` === selectedAmount
      )
    : transactions;

  useEffect(() => {
    fetchData();
  }, [userId]);

  console.log("Transactions:", transactions);

  return (
    <div className="w-[80%] ml-4 fixed right-0 top-0 h-screen flex flex-col bg-gray-primary text-black p-4 overflow-y-auto custom-scrollbar">
      <UserProfile />
      <div className="flex w-[80%] mx-auto p-4 justify-between">
        <div className="w-full mt-6 font-bold">Recent transactions</div>
        <div>
          <Select onValueChange={setSelectedAmount}>
            <SelectTrigger className=" flex border rounded-lg p-2">
              <SelectValue className="text-lg" placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="$1">$1</SelectItem>
                <SelectItem value="$2">$2</SelectItem>
                <SelectItem value="$5">$5</SelectItem>
                <SelectItem value="$10">$10</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {transactions.length > 0 ? (
        <div className="w-[80%] my-auto p-5 overflow-y-auto custom-scrollbar mx-auto mt-4">
          {filteredTransactions.map((transaction) => (
            <RecentSupport key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="w-full my-auto mx-auto p-5 text-center text-gray-500 mt-4">
          {transactions && (
            <>
              <HomeSkeleton />
              <HomeSkeleton />
              <HomeSkeleton />
              <HomeSkeleton />
              <HomeSkeleton />
              <HomeSkeleton />
            </>
          )}
          {(!transactions || selectedAmount) &&
            "Donation information is not available"}
        </div>
      )}
    </div>
  );
}
