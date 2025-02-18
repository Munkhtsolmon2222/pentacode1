"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { accessToken } from "@/utils/accessToken";

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-plus-jakarta",
});

export function ForgotPassword() {
	const router = useRouter();
	const [responses, setResponses] = useState<string | null>(null);
	const [userOtp, setUserOtp] = useState("");
	const [email, setEmail] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setResponses(null);
		setOtpSent(false);
	};

	const verifyEmail = async () => {
		setResponses(null);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
					body: JSON.stringify({ email }),
				}
			);

			const data = await response.json();
			setResponses(data.message);

			if (data.message === "OTP sent successfully") {
				setOtpSent(true);
			}
		} catch (error) {
			console.error("Error verifying email:", error);
		}
	};

	const verifyOtp = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, otp: userOtp }),
				}
			);

			const data = await response.json();
			if (data.message === "OTP verified successfully") {
				setOtpVerified(true);
				setResponses(null);
			} else {
				setResponses("Invalid or expired OTP");
			}
		} catch (error) {
			console.error("Error verifying OTP:", error);
		}
	};

	const changePassword = async () => {
		if (password !== confirmPassword) {
			setResponses("Passwords do not match");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await response.json();
			setResponses(data.message);

			if (data.message === "Password changed successfully") {
				setPasswordChanged(true);
			}
		} catch (error) {
			console.error("Error resetting password:", error);
		}
	};

	return (
		<div className={`${plusJakartaSans.variable} font-sans`}>
			<div className="mx-auto mt-[160px] text-black w-[360px]">
				<div className="h-auto rounded-xl p-[20px] space-y-">
					<b className="text-[24px]">Forgot your password</b>

					{!otpVerified ? (
						<>
							<p className="text-[12px] text-gray-500">
								Enter your email address
							</p>
							<Input
								id="email"
								type="email"
								placeholder="Email"
								value={email}
								onChange={handleEmailChange}
							/>
							{responses && (
								<div className="text-red-500 text-[12px]">{responses}</div>
							)}

							{!otpSent && (
								<button
									className="block mx-auto w-full p-2 rounded-xl mt-4 bg-primary text-white"
									onClick={verifyEmail}
									disabled={!email}
								>
									Send OTP
								</button>
							)}

							{otpSent && (
								<>
									<p className="text-[12px] text-gray-500">
										Enter the OTP sent to your email
									</p>
									<Input
										id="otp"
										type="number"
										placeholder="Enter OTP"
										value={userOtp}
										onChange={(e) => setUserOtp(e.target.value)}
									/>
									<button
										className="block mx-auto w-full p-2 rounded-xl mt-2 bg-green-500 text-white"
										onClick={verifyOtp}
									>
										Verify OTP
									</button>
								</>
							)}
						</>
					) : passwordChanged ? (
						<div className="text-center space-y-4">
							<p className="text-green-500 text-[14px] font-medium">
								Password changed successfully!
							</p>
						</div>
					) : (
						<div className="space-y-4">
							<p className="text-[12px] text-gray-500">
								Enter your new password
							</p>
							<Input
								id="password"
								type="password"
								placeholder="New Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{responses && (
								<div className="text-red-500 text-[12px]">
									{responses}
									<button
										className="block mx-auto w-full p-2 rounded-xl bg-blue-500 text-white"
										onClick={() => router.push("/login")}
									>
										Go to Login
									</button>
								</div>
							)}
							{!responses && (
								<button
									className="block mx-auto w-full p-2 rounded-xl mt-4 bg-green-500 text-white"
									onClick={changePassword}
									disabled={!password || !confirmPassword}
								>
									Change Password
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
