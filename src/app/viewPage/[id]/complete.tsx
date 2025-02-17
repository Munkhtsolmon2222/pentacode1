"use client";
import { User } from "@/app/constants/type";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Complete() {
  const [userData, setUserData] = useState<User[]>();
  const params = useParams();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/view/${params.id}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      console.log(res);
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(params.id);
  useEffect(() => {
    fetchData();
  }, [params?.id]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[696px]">
        <div className="p-4 flex flex-col items-center gap-2">
          <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] text-white flex justify-center items-center">
            <CheckCircle2 />
          </div>
          <p className="font-bold">Donation Complete!</p>
        </div>
        <div className="max-w-[510px] border rounded-md gap-2 p-8">
          <div className="w-6 h-6 rounded-full flex">
            <img src={userData?.[0]?.avatarImage} alt="User" />
            <p>{userData?.[0]?.name}</p>
          </div>
          <p className="p-2 gap-2">
            Thank you for supporting me! It means a lot to have your support.
            It’s a step toward creating a more inclusive and accepting community
            of artists.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-[#18181B] p-4 text-white border border-bg-[#E4E4E7] rounded-md"
          onClick={() => window.location.reload()}
        >
          Return to explore
        </button>
      </div>
    </div>
  );
}
