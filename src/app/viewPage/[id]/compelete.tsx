import { User } from "@/app/constants/type";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Complete() {
  const [userData, setUserData] = useState<User>();
  return (
    <div className="w-[50%] flex flex-col justify-center items-center ">
      <div className="p-2">
        <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] flex justify-center items-center">
          <CheckCircle2 className="text-white" />
        </div>
        <p className="font-bold">Donation Complete!</p>
      </div>

      <div className=" p-4  border">
        <div className="w-6 h-6 rounded-full">
          <img src={userData?.avatarImage} alt="User" />
          <p>{userData?.name}</p>
        </div>
        <p>
          Thank you for supporting me! It means a lot to have your support. It’s
          a step toward creating a more inclusive and accepting community of
          artists.
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <button
          className="bg-[#18181B] p-4 text-white border rounded-lg"
          onClick={() => window.location.reload()}
        >
          Return to explore
        </button>
      </div>
    </div>
  );
}
