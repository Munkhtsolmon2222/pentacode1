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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="block mx-auto w-full box-border p-2 bg-primary text-white"
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
