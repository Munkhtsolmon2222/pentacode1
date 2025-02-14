"use client";

import { Login } from "@/app/_components/auth/LogIn";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

export default function Page() {
  return (
    <div className={`${plusJakartaSans} font-sans flex w-full h-screen`}>
      <div className="w-[50%] h-screen bg-amber-400">
        <div className="flex justify-start items-start p-6 mx-6">
          <img
            src="/assets/Logo-coffee.svg"
            alt="Login"
            className="w-[140px] h-auto"
          />
        </div>
        <div className="mt-[180px]">
          <div className="flex justify-center items-center">
            <img
              src="/assets/Illustration.svg"
              alt="Login"
              className="rounded-xl w-[240px] h-auto mb-8"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-center space-y-2">
            <p className="text-lg font-bold">Fund your creative work</p>
            <p className="text-gray-700">
              Accept support. Start a membership. Set up a shop. It’s easier
              than you think.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[50%]">
        <Login />
      </div>
    </div>
  );
}
