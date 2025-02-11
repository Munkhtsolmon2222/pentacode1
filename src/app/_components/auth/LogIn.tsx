"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function Login() {
  const [type, setType] = useState("password");
  const [error, setError] = useState("");
  const { setUserId } = useAuth();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const verifyUser = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.message === "Email not found") {
        console.log("Error: Email does not exist.");
        setError("Email does not exist.");
      } else if (data.message === "Incorrect password") {
        console.log("Error: Password is incorrect.");
        setError("Password is incorrect.");
      } else {
        console.log("Login successful!");
        setError("Login successful!");
        setUserId(data.id);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    verifyUser(values.email, values.password);
  }

  function changeType() {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  }

  return (
    <div className={`${plusJakartaSans.variable} font-sans min-h-screen`}>
      <div className="flex justify-end items-center p-6 mx-6">
        <Link href="/signup">
          <Button variant="secondary">Sign up</Button>
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-[180px] text-black space-y-4">
        <div className="w-[360px] mx-auto text-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <p className="text-[24px] font-bold">Welcome back</p>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="font-bold">Email</div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email here" {...field} />
                    </FormControl>
                    <FormMessage />
                    {error == "Email does not exist." && (
                      <div className="block mx-auto w-[90%] text-red-500 text-[12px]">
                        {error}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="font-bold">Password</div>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter password here"
                          type={type}
                          {...field}
                        />
                        <div
                          onClick={changeType}
                          className="absolute top-2 left-[300px] text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {type === "text" ? <Eye /> : <EyeClosed />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {error == "Password is incorrect." && (
                      <div className="block mx-auto w-[90%] text-red-500 text-[12px]">
                        {error}
                        <Link href="/forgot-password">
                          <p className="text-black hover:underline">
                            Forgot password ?
                          </p>
                        </Link>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button
                className="block mx-auto w-full p-2 bg-primary text-white"
                type="submit"
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
