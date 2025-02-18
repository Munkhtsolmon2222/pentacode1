"use client";

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
import { Card, CardContent } from "@/components/ui/cardForBank";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const formSchema = z.object({
	country: z.string().min(1, "Please select a country."),
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	cardNumber: z
		.string()
		.regex(
			/^\d{4}-\d{4}-\d{4}-\d{4}$/,
			"Enter a valid 16-digit card number (XXXX-XXXX-XXXX-XXXX)."
		),
	month: z.string().min(1, "Please select an expiration month."),
	year: z.string().min(1, "Please select an expiration year."),
	cvc: z
		.string()
		.length(3, "CVC must be 3 digits.")
		.regex(/^\d{3}$/, "CVC must be numeric."),
});
type FormValues = z.infer<typeof formSchema>;

export default function CreateBankCard() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});
	const params = useParams();
	const accessToken = Cookies.get("accessToken");

	const onSubmit = (data: FormValues) => {
		console.log("Submitted Data:", data);
		addBankCard(data);
	};

	const handleCardNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let value = event.target.value.replace(/\D/g, "");
		value = value.slice(0, 16);
		const formattedValue = value.replace(/(\d{4})/g, "$1-").replace(/-$/, "");
		setValue("cardNumber", formattedValue, { shouldValidate: true });
	};

	const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value.replace(/\D/g, "");
		value = value.slice(0, 3);
		setValue("cvc", value, { shouldValidate: true });
	};

	const addBankCard = async (data: FormValues) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/bank-card/${params.userId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
					method: "POST",
					body: JSON.stringify({
						country: data.country,
						firstName: data.firstName,
						lastName: data.lastName,
						cardNumber: data.cardNumber,
						expiryDate: `${data.month}/${data.year}`,
						cvc: data.cvc,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to add bank card");
			}

			const responseData = await response.json();
			console.log("Bank card added successfully:", responseData);
			router.push("/home");
		} catch (error) {
			console.error("Error adding bank card:", error);
		}
	};
	console.log(params.userId);
	const selectedYear = watch("year");
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	return (
		<Card className="max-w-md mx-auto mt-[300px] p-6">
			<CardContent>
				<h2 className="text-xl font-bold">How would you like to be paid?</h2>
				<p className="text-gray-500 mb-4">Enter location and payment details</p>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<Label>Select country</Label>
						<Select onValueChange={(val: any) => setValue("country", val)}>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
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
							<Select onValueChange={(val: any) => setValue("month", val)}>
								<SelectTrigger>
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem key="Jan" value="January">
										January
									</SelectItem>
									<SelectItem key="Feb" value="February">
										February
									</SelectItem>
									<SelectItem key="Mar" value="March">
										March
									</SelectItem>
									<SelectItem key="Apr" value="April">
										April
									</SelectItem>
									<SelectItem key="May" value="May">
										May
									</SelectItem>
									<SelectItem key="Jun" value="June">
										June
									</SelectItem>
									<SelectItem key="Jul" value="July">
										July
									</SelectItem>
									<SelectItem key="Aug" value="August">
										August
									</SelectItem>
									<SelectItem key="Sep" value="September">
										September
									</SelectItem>
									<SelectItem key="Oct" value="October">
										October
									</SelectItem>
									<SelectItem key="Nov" value="November">
										November
									</SelectItem>
									<SelectItem key="Dec" value="December">
										December
									</SelectItem>
								</SelectContent>
							</Select>
							{errors.month && (
								<p className="text-red-500 text-sm">{errors.month.message}</p>
							)}
						</div>
						<div className="flex-1">
							<Label>Year</Label>
							<Select onValueChange={(val: any) => setValue("year", val)}>
								<SelectTrigger>
									<SelectValue placeholder="Year" />
								</SelectTrigger>
								<SelectContent>
									{[...Array(10)].map((_, i) => (
										<SelectItem key={i} value={(currentYear + i).toString()}>
											{currentYear + i}
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
							<Input
								{...register("cvc")}
								placeholder="CVC"
								maxLength={3}
								onChange={handleCvcChange}
							/>
							{errors.cvc && (
								<p className="text-red-500 text-sm">{errors.cvc.message}</p>
							)}
						</div>
					</div>
					<Button
						type="submit"
						className="w-[246px] ml-[264px] bg-black text-white"
						disabled={!isValid}
					>
						Continue
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
