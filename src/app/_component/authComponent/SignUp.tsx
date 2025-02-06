"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";

export function SignUp() {
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
    <div className="max-w-md mx-auto mt-[100px] text-black">
      <div className="h-auto rounded-xl bg-[#ffffff]">
        <div className="box-border p-[32px]">
          <div>
            <b className="text-[24px]">Create your account</b>
            <p className="text-[16px] text-gray-500">
              Sign up to explore your favorite dishes.
            </p>
          </div>
        </div>
        <form className="space-y-4">
          <label className="pl-[20px] text-sm"></label>
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
              className="absolute top-[9px] left-[370px] text-gray-200 hover:text-gray-500 "
            >
              {type == "text" && <Eye />}
              {type == "password" && <EyeClosed />}
            </div>
          </div>
          <p className="block text-[12px] underline mx-auto w-[90%]">
            Forgot password ?
          </p>
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
            className="block mx-auto w-[90%] box-border p-2 rounded-xl mt-[20px] bg-primary text-white"
          >
            Lets go
          </button>
        </div>
        <div className="flex text-sm justify-center p-4 gap-2">
          <p className="cursor-pointer">Don’t have an account?</p>
          {/* <Link></Link> */}
          <p className="text-[#2563EB] cursor-pointer hover:underline ">
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
}
