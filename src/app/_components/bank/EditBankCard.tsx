"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
const formSchema = z.object({
	country: z.string().min(1, "Country is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	cardNumber: z
		.string()
		.regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number"),
	month: z.string().min(1, "Month is required"),
	year: z.string().min(1, "Year is required"),
	cvc: z.string().length(3, "CVC must be 3 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditBankCard({ userId }: { userId: any }) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);
	const accessToken = Cookies.get("accessToken");
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: FormValues) => {
		setLoading(true);
		setMessage(null);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/bank-card/${userId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
					body: JSON.stringify(data),
				}
			);
			if (!response.ok) throw new Error("Failed to update card");
			setMessage({ type: "success", text: "Card updated successfully!" });
		} catch (error) {
			console.error("Error updating card:", error);
			setMessage({ type: "error", text: "Failed to update card." });
		} finally {
			setLoading(false);
		}
	};

	const handleCardNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let value = event.target.value.replace(/\D/g, "");
		value = value.slice(0, 16);
		const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-");
		setValue("cardNumber", formattedValue);
	};

	const fetchCardData = async () => {
		if (!userId) {
			console.warn("No userId found, skipping fetch.");
			return;
		}
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/bank-card/${userId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
				}
			);
			if (!response.ok) throw new Error("Failed to fetch card data");
			const data = await response.json();
			setValue("country", data.country || "");
			setValue("firstName", data.firstName || "");
			setValue("lastName", data.lastName || "");
			setValue("cardNumber", data.cardNumber || "");
			setValue("month", data.month || "");
			setValue("year", data.year || "");
			setValue("cvc", data.cvc || "");
		} catch (error) {
			console.error("Error fetching card data:", error);
		}
	};

	useEffect(() => {
		fetchCardData();
	}, [userId]);

	return (
		<Card className="w-full max-w-[1000px] mx-auto mt-8 p-6">
			<CardContent>
				<h2 className="text-xl font-bold">Payment details</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Success/Error Message */}
					{message && (
						<p
							className={`text-sm ${
								message.type === "success" ? "text-green-500" : "text-red-500"
							}`}
						>
							{message.text}
						</p>
					)}

					<div>
						<Label>Select country</Label>
						<Select
							onValueChange={(val) => setValue("country", val)}
							defaultValue={watch("country")}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select country" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="USA">USA</SelectItem>
								<SelectItem value="Canada">Canada</SelectItem>
								<SelectItem value="UK">UK</SelectItem>
								<SelectItem value="Mongolia">Mongolia</SelectItem>
							</SelectContent>
						</Select>
						{errors.country && (
							<p className="text-red-500 text-sm">{errors.country.message}</p>
						)}
					</div>
					<div className="flex space-x-2">
						<div className="flex-1">
							<Label>First name</Label>
							<Input
								{...register("firstName")}
								placeholder="Enter your name here"
							/>
							{errors.firstName && (
								<p className="text-red-500 text-sm">
									{errors.firstName.message}
								</p>
							)}
						</div>
						<div className="flex-1">
							<Label>Last name</Label>
							<Input
								{...register("lastName")}
								placeholder="Enter your name here"
							/>
							{errors.lastName && (
								<p className="text-red-500 text-sm">
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<Label>Enter card number</Label>
						<Input
							{...register("cardNumber")}
							placeholder="XXXX-XXXX-XXXX-XXXX"
							maxLength={19}
							value={watch("cardNumber") || ""}
							onChange={handleCardNumberChange}
						/>
						{errors.cardNumber && (
							<p className="text-red-500 text-sm">
								{errors.cardNumber.message}
							</p>
						)}
					</div>
					<div className="flex space-x-2">
						<div className="flex-1">
							<Label>Expires</Label>
							<Select
								onValueChange={(val) => setValue("month", val)}
								defaultValue={watch("month")}
							>
								<SelectTrigger>
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent>
									{[
										"January",
										"February",
										"March",
										"April",
										"May",
										"June",
										"July",
										"August",
										"September",
										"October",
										"November",
										"December",
									].map((month) => (
										<SelectItem key={month} value={month}>
											{month}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.month && (
								<p className="text-red-500 text-sm">{errors.month.message}</p>
							)}
						</div>
						<div className="flex-1">
							<Label>Year</Label>
							<Select
								onValueChange={(val) => setValue("year", val)}
								defaultValue={watch("year")}
							>
								<SelectTrigger>
									<SelectValue placeholder="Year" />
								</SelectTrigger>
								<SelectContent>
									{[...Array(10)].map((_, i) => (
										<SelectItem key={i} value={(2025 + i).toString()}>
											{2025 + i}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.year && (
								<p className="text-red-500 text-sm">{errors.year.message}</p>
							)}
						</div>
						<div className="flex-1">
							<Label>CVC</Label>
							<Input {...register("cvc")} placeholder="CVC" maxLength={3} />
							{errors.cvc && (
								<p className="text-red-500 text-sm">{errors.cvc.message}</p>
							)}
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Saving..." : "Save changes"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
