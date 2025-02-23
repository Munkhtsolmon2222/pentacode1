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
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "../constants/type";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "motion/react";

export default function UserProfile() {
  const [userData, setUserData] = useState<User | null>(null);
  const [totalValue, setTotalValue] = useState<string | null>(null);
  const pathName = usePathname();
  const [userValue, setUserValue] = useState({
    totalEarnings30Days: 0,
    totalEarnings90Days: 0,
    totalEarningsAllTime: 0,
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const storedUserId: string | null = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const accessToken = Cookies.get("accessToken");
  const fetchData = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }
    console.log(accessToken, "userProfile");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/currentuser/${userId}`,
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
    let timeOut: NodeJS.Timeout;
    if (alert) {
      timeOut = setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [alert]);

  const fetchTotalEarnings = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/total-earnings/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch earnings data");
      const resJson = await response.json();
      setUserValue({
        totalEarnings30Days: resJson.totalEarnings30Days,
        totalEarnings90Days: resJson.totalEarnings90Days,
        totalEarningsAllTime: resJson.totalEarnings90Days,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareLink = () => {
    setAlert(true);
    navigator.clipboard
      .writeText(window.location.hostname + "/user/" + `${userId}`)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const renderEarnings = () => {
    if (totalValue === "30day") {
      return `$${userValue.totalEarnings30Days || "0"}`;
    } else if (totalValue === "90days") {
      return `$${userValue.totalEarnings90Days || "0"}`;
    } else if (totalValue === "Alltime") {
      return `$${userValue.totalEarningsAllTime || "0"}`;
    }
    return `${userValue.totalEarnings30Days}$`;
  };
  useEffect(() => {
    console.log("checking");
    fetchData();
    fetchTotalEarnings();
  }, [userId, pathName]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full bg-gray-primary text-black p-4 mt-10"
    >
      <div className="max-w-[80%] mx-auto mt-16 p-5 border border-solid rounded-lg">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 rounded-full flex gap-3 items-center">
            <img
              src={userData?.avatarImage}
              className="rounded-full  h-full w-full object-cover "
            />
            <div className="flex flex-col">
              <h4 className="font-semibold">{userData?.name}</h4>
              <a className="text-sm">{userData?.socialMediaURL}</a>
            </div>
          </div>
          <button
            onClick={handleShareLink}
            className="flex max-h-10 items-center text-white gap-3 p-4 bg-[#18181B] rounded-md"
          >
            <LuCopy /> Share page link
          </button>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="fixed bottom-5 right-5 z-50"
            >
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Link copied to clipboard!</AlertTitle>
              </Alert>
            </motion.div>
          )}
        </div>
        <div className="max-w-[80%] mx-auto border border-solid bg-[#E4E4E7] mt-6"></div>
        <div className="flex items-center gap-4 pt-7">
          <h4 className="font-bold text-2xl">Earning</h4>
          <Select onValueChange={setTotalValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue className="text-lg" placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30day">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="Alltime">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-4xl size-9 pt-6 pb-10">
          {renderEarnings()}
        </p>
      </div>
    </motion.div>
  );
}
