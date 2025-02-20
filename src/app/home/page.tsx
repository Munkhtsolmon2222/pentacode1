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
import Cookies from "js-cookie";
import { HomeSkeleton } from "../_components/skeletons/HomeSkeleton";
import { usePathname } from "next/navigation";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const storedUserId: string | null = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const pathname = usePathname();
  console.log("User ID:", userId);
  const accessToken = Cookies.get("accessToken");
  const fetchData = async () => {
    setIsLoading(true);
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }
    console.log(accessToken, "home");
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
      setIsLoading(false);
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
    console.log("wooorkinggg");
  }, [userId, pathname]);

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
      {isLoading && (
        <div className="w-full my-auto p-5 overflow-y-auto custom-scrollbar mx-auto mt-4">
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
        </div>
      )}
      {transactions.length > 0 ? (
        <div className="w-[80%] mx-auto my-auto p-5 overflow-y-auto custom-scrollbar mt-4">
          {filteredTransactions.map((transaction: any) => (
            <RecentSupport
              key={transaction.id}
              transaction={transaction}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <div className="w-[80%] my-auto mx-auto p-5 text-center text-gray-500 mt-4">
          <div>Donation information is not available</div>
        </div>
      )}
    </div>
  );
}
