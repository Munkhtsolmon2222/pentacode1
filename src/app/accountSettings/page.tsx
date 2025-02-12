"use client";
import { useState } from "react";
import EditBankCard from "../_components/bank/EditBankCard";
import EditProfile from "../_components/profile/EditProfile";

export default function AccountSettings() {
	const userId = localStorage.getItem("userId");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const updatePassword = async () => {
		setError("");
		setSuccess("");

		if (!password || !confirmPassword) {
			setError("Please fill in both password fields.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:5000/auth/update-password/${userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ password }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update password.");
			}

			setSuccess("Password updated successfully!");
			setPassword("");
			setConfirmPassword("");
		} catch (error) {
			setError("Failed to update password. Please try again later.");
			console.error("Error updating password:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="pb-28">
			<h3 className="font-bold ">My account</h3>
			<EditProfile />
			<div className="max-w-lg mx-auto border border-[#E4E4E7] rounded-lg mt-8">
				<p className="p-6 font-bold"> Set a new password</p>
				<div className="px-6">
					<p className="">New Password</p>
					<input
						type="password"
						placeholder="New password"
						className="py-[10px] pl-3 mt-2 border rounded-md w-full"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="pt-3">Confirm Password</p>
					<input
						type="password"
						placeholder="Confirm Password"
						className="py-[10px] pl-3 mt-2 border rounded-md w-full"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					{success && <p className="text-green-500 text-sm mt-2">{success}</p>}
				</div>
				<div className="p-6">
					<button
						className={`w-full p-2 bg-black text-white rounded-md ${
							isLoading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						onClick={updatePassword}
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save changes"}
					</button>
				</div>
			</div>
			<EditBankCard />
			<div className="p-4 mt-8 max-w-lg rounded-lg border-[#E4E4E7] border mx-auto">
				<p className="text-lg font-bold">Success page</p>
				<div className="mt-4">
					<label className="font-medium">Confirmation message</label>
					<textarea
						name="about"
						placeholder="Thank you for supporting me! It means a lot to have your support. It’s a step toward creating a more inclusive and accepting community of artists."
						className={`border rounded-md w-full p-2 mt-1`}
					/>
				</div>
				<button className="mt-6 w-full p-2 bg-black text-white rounded-md">
					Save changes
				</button>
			</div>
		</div>
	);
}
