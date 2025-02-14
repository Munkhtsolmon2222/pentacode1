import { User } from "@/app/constants/type";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Complete() {
  const [userData, setUserData] = useState<User>();
  return (
    <div className="w-[50%] flex flex-col justify-center items-center gap-4">
      <div className=" flex flex-col items-center p-2">
        <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] flex justify-center items-center">
          <CheckCircle2 className="text-white" />
        </div>
        <p className="font-bold mt-4 px-1 py-2">Donation Complete ! </p>
      </div>

      <div className="max-w-[510px] p-4 border rounded-md">
        <div className="w-6 h-6 flex rounded-full m-2">
          <img src={userData?.avatarImage} alt="User" />
          <p>{userData?.name}</p>
        </div>
        <p className="m-2">
          Thank you for supporting me! It means a lot to have your support. It’s
          a step toward creating a more inclusive and accepting community of
          artists.
        </p>
      </div>
      <div className="flex justify-center items-center p-4">
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
