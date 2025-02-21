"use client"
import { SignUp } from "@/app/_components/auth/SignUp";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useEffect } from "react";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

export default function Page() {
  const controls = useAnimation();

  useEffect(() => {
    // Animate the yellow background to slide out to the right
    controls.start({ x: "100vw", transition: { duration: 1, ease: "easeInOut" } });
  }, [controls]);

  return (
    <div className={`${plusJakartaSans.variable} font-sans flex w-full h-screen`}>
      {/* Yellow background covering the page */}
      <motion.div
        initial={{ x: 0 }}
        animate={controls} // Control the animation of the background
        className="fixed top-0 left-0 w-full h-full bg-yellow-400 z-50"
      />

      {/* Left side with content */}
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

      {/* Right side with sign-up */}
      <div className="w-[50%]">
        <SignUp />
      </div>
    </div>
  );
}
