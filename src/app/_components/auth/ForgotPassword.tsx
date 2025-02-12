"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { set } from "zod";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

export type response = {
  message: string;
  id: string;
};

export function ForgotPassword() {
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [responses, setResponses] = useState<response>();
  const [data, setData] = useState();
  const router = useRouter();

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  function handleUsernameCheck() {
    setIsUsernameValid(username.length >= 3);
  }

  function handleContinue() {
    console.log(showEmailPassword);

    if (isUsernameValid) {
      setShowEmailPassword(true);
    }
  }

  function handleCheckEmail() {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailCheck.test(email);
  }

  function handleCheckPassword() {
    return password.length > 7;
  }

  function changeType() {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  }

  useEffect(() => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify([{ username, email, password }])
    );
  }, [username, email, password]);

  const addUser = async (username: string, email: string, password: string) => {
    console.log("calling");
    try {
      const user = await fetch("http://localhost:5000/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const response = await user.json();
      if (response.message == "Internal server error") {
        handleContinue();
      } else {
        setResponses(response);
      }
      console.log(response);
      if (response.message == "Successfully added") {
        router.push(`/profileSetup/${response.id}`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <div className="max-w-md mx-auto mt-[200px] text-black space-y-4">
        <div className="h-auto rounded-xl p-[20px]">
          {!showEmailPassword && (
            <>
              <b className="text-[24px]">Reset Password</b>
              <p className="text-[12px] text-gray-500">Enter your email</p>
              <label className="text-sm font-bold mt-4">Email</label>
              <Input
                className="block mx-auto w-full p-4 h-10 border-2 border-black-500 rounded-lg"
                id="username"
                required
                type="text"
                placeholder="Enter a email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, username: true }));
                  handleUsernameCheck();
                }}
              />

              {responses && (
                <div className="block mx-auto w-[90%] text-red-500 text-[12px]">
                  {responses?.message}
                  <Link href="/login">
                    <div className="text-black hover:underline">
                      Do you want to Log in?
                    </div>
                  </Link>
                </div>
              )}

              <div className="flex p-[24px]">
                <button
                  className="block mx-auto w-full box-border p-2 rounded-xl mt-[20px] bg-primary text-white"
                  disabled={!isUsernameValid}
                  onClick={() => {
                    if (isUsernameValid) {
                      addUser(username, email, password);
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {showEmailPassword && (
            <>
              <b className="text-[24px]">Welcome, {username}</b>
              <p className="text-[12px] text-gray-500">
                Connect email and set a password
              </p>
              <label className="pl-[20px] text-sm font-bold">E-mail</label>
              <Input
                className="block mx-auto w-full p-4 h-10 border-2 border-black-500 rounded-lg"
                id="mail"
                required
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              />
              {touched.email && !handleCheckEmail() && (
                <p className="block mx-auto w-[90%] text-red-500 text-[12px]">
                  Invalid email. Use a format like example@email.com
                </p>
              )}

              <div className="relative">
                <label className="pl-[20px] text-sm font-bold">Password</label>
                <Input
                  className="block mx-auto w-full p-4 h-10 border-2 border-black-500 rounded-lg"
                  id="password"
                  required
                  type={type}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, password: true }))
                  }
                />
                {touched.password && !handleCheckPassword() && (
                  <p className="block mx-auto w-[90%] text-red-500 text-[12px]">
                    Password must be at least 8 characters.
                  </p>
                )}
                <div
                  onClick={changeType}
                  className="absolute top-[30px] left-[370px] text-gray-200 hover:text-gray-500 cursor-pointer"
                >
                  {type === "text" ? <Eye /> : <EyeClosed />}
                </div>
              </div>

              <div className="flex p-[24px]">
                <button
                  className="block mx-auto w-full box-border p-2 rounded-xl mt-[20px] bg-primary text-white"
                  disabled={!handleCheckEmail() || !handleCheckPassword()}
                  onClick={() => {
                    addUser(username, email, password);
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
