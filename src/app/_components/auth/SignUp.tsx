"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loading from "./loading.json";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

export type response = {
  message: string;
  id: string;
};

type DecodedToken = {
  userId?: string;
};

export function SignUp() {
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<response>();
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
    try {
      setIsLoading(true);
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      const response = await user.json();
      if (response.message === "Internal server error") {
        handleContinue();
      } else {
        setResponses(response);
      }

      if (response.message === "Successfully added") {
        const decodedToken: DecodedToken = jwtDecode(response.data.accessToken);
        const userId = decodedToken.userId;

        if (userId) {
          setCookie("accessToken", response?.data?.accessToken);
          setCookie("refreshToken", response?.data?.refreshToken);
          localStorage.setItem("userId", userId);
          router.push(`/profileSetup/${userId}`);
        } else {
          throw new Error("Invalid token structure: userId missing.");
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <div className="flex justify-end items-center p-6 mx-6">
        <Link href="/login">
          <Button variant="secondary">Log in</Button>
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-[200px] text-black space-y-4">
        <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-lg rounded-lg">
          {!showEmailPassword && (
            <div className="space-y-2">
              <b className="text-[24px]">Create Your Account</b>
              <p className="text-[12px] text-gray-500">
                Choose a username for your page
              </p>
              <label className="text-sm font-bold mt-4">Username</label>
              <Input
                className="block mx-auto w-full p-4 h-10 border-2 border-black-500 rounded-lg"
                id="username"
                required
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, username: true }));
                  handleUsernameCheck();
                }}
              />
              {touched.username && !isUsernameValid && (
                <div>
                  <p className="block mx-auto w-[90%] text-red-500 text-[12px]">
                    Username must be at least 3 characters.
                  </p>
                </div>
              )}
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

              <div className="flex">
                <Button
                  className="w-full block mx-auto box-border py-2 mt-[20px] bg-primary text-white"
                  type="submit"
                  disabled={isLoading}
                  onClick={() => {
                    if (isUsernameValid) {
                      addUser(username, email, password);
                    }
                  }}
                >
                  {isLoading ? "Loading..." : "Continue"}
                </Button>
              </div>
            </div>
          )}

          {showEmailPassword && (
            <div className="space-y-2">
              <b className="text-[24px]">Welcome, {username}</b>
              <p className="text-[12px] text-gray-500">
                Connect email and set a password
              </p>
              <label className="text-sm font-bold">E-mail</label>
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
                <label className="text-sm font-bold">Password</label>
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

              <div className="flex">
                <Button
                  className="block mx-auto w-full box-border p-2 mt-[20px] bg-primary text-white"
                  disabled={
                    !handleCheckEmail() || !handleCheckPassword() || !isLoading
                  }
                  onClick={() => {
                    addUser(username, email, password);
                  }}
                >
                  {isLoading ? "Loading..." : "Continue"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
