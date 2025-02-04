"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  let newErrors = {
    mail: "",
    password: "",
    confirmPassword: "",
  };

  function hanleCheck() {
    let isValid = true;
    if (email) {
      const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailCheck.test(email)) {
        isValid = false;
        newErrors.mail = "Invalid email. Use a format like example@email.com";
      }
    }
    return isValid;
  }

  function handleCheckPassword() {
    let isCorrect = true;
    if (password.length <= 7) {
      isCorrect = false;
      newErrors.password = "Incorrect password. Please try again.";
    }
    return isCorrect;
  }

  function changeType() {
    if (type == "password") {
      setType("text");
    } else if (type == "text") {
      setType("password");
    }
  }

  return (
    <div>
      <div className="flex justify-end items-center p-6 mx-6">
        <Link href="/signup">
          <Button variant="secondary">Sign up</Button>
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-[160px] text-black">
        <div className="h-auto rounded-xl">
          <div className="p-[20px]">
            <div>
              <b className="text-[24px]">Welcome back</b>
            </div>
          </div>
          <form className="space-y-2">
            <label className="pl-[20px] text-sm font-bold">E-mail</label>
            <Input
              className="block mx-auto w-[90%] p-4 h-10 border-2 border-black-500 rounded-lg"
              id="mail"
              required
              type="text"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {!hanleCheck() && (
              <p className="block mx-auto w-[90%] text-red-500 text-[12px]">
                {newErrors.mail}
              </p>
            )}
            <div className="relative">
              <label className="pl-[20px] text-sm font-bold">Password</label>
              <Input
                className="block mx-auto w-[90%] p-4 h-10 border-2 border-black-500 rounded-lg"
                id="password"
                required
                type={type}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {!handleCheckPassword() && (
                <p className="block mx-auto w-[90%] text-red-500 text-[12px]">
                  {newErrors.password}
                </p>
              )}
              <div
                onClick={changeType}
                className="absolute top-[30px] left-[370px] text-gray-200 hover:text-gray-500 "
              >
                {type == "text" && <Eye />}
                {type == "password" && <EyeClosed />}
              </div>
            </div>
          </form>
          <div className="flex p-[24px]">
            <button
              // onClick={() => {
              //   if (isValid) {
              //     setCurrentStep(3);
              //   } else {
              //     setErorrs(newErrors);
              //   }
              //   ``;
              // }}
              className="block mx-auto w-full box-border p-2 rounded-xl mt-[20px] bg-primary text-white"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
