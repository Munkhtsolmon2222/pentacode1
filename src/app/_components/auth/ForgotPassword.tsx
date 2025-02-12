"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { useState } from "react";

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
  const [responses, setResponses] = useState();
  const [userOtp, setUserOtp] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  console.log(userOtp);

  const verifyEmail = async (email: string) => {
    console.log("calling");
    try {
      const user = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const response = await user.json();
      console.log(response);
      if (response.message == "User not found") {
        // handleContinue();
      } else {
        setResponses(response.message);
      }
      console.log(response);
      if (response.message == "OTP sent successfully") {
        // router.push(`/profileSetup/${response.id}`);
        setResponses(response.message);
      }
    } catch (error) {
      console.error("Error verifing email:", error);
    }
  };

  const checkOtp = async (userOtp: number) => {
    const response = await fetch("http://localhost:5000/auth/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userOtp }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <div className="max-w-md mx-auto mt-[160px] text-black">
        <div className="h-auto rounded-xl p-[20px] space-y-">
          <form onSubmit={formik.handleSubmit}>
            <b className="text-[24px]">Forgot your password</b>
            <p className="text-[12px] text-gray-500">Enter you email address</p>
            <label htmlFor="email">Email Address</label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            {responses && (
              <div className="block mx-auto w-[90%] text-red-500 text-[12px]">
                {responses}
              </div>
            )}
            {responses == "OTP sent successfully" && (
              <Input
                id="OTP"
                name="One time password"
                type="number"
                onChange={(e) => setUserOtp(e.target.value)}
                value={userOtp}
              />
            )}

            <button
              className="block mx-auto w-full box-border p-2 rounded-xl mt-[20px] bg-primary text-white"
              disabled={!formik.values.email}
              onClick={() => {
                if (formik.values.email) {
                  verifyEmail(formik.values.email);
                }
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
