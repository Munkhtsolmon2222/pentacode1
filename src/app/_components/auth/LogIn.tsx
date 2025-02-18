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
import { getUserId } from "@/utils/userId";

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
	const [userId, setUserId] = useState<string>();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

	const verifyUser = async (email: string, password: string) => {
		try {
			const response = await fetch("http://localhost:5000/auth/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
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

				getUserId().then((userId) => {
					setUserId(userId);
				});

				router.push("/home");
			}
		} catch (error) {
			console.error("Error verifying user:", error);
		}
	};

  function onSubmit(values: z.infer<typeof formSchema>) {
    verifyUser(values.email, values.password);

  return (
    <div
      className={`${plusJakartaSans.variable} font-sans min-h-screen flex flex-col items-center justify-center`}
    >
      <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
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
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password here"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
