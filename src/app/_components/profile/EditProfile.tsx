"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function EditBankCard() {
	const params = useParams();
	const cardId = params.cardId; // Assuming `cardId` is passed in the route
	const [form, setForm] = useState({
		cardNumber: "",
		cardHolderName: "",
		expiryDate: "",
		cvv: "",
	});
	const [error, setError] = useState<{
		cardNumber?: string;
		cardHolderName?: string;
		expiryDate?: string;
		cvv?: string;
	}>({});
	const [isLoading, setIsLoading] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const cardSchema = z.object({
		cardNumber: z
			.string()
			.length(16, { message: "Card number must be 16 digits" }),
		cardHolderName: z
			.string()
			.min(2, { message: "Cardholder name must be at least 2 characters" }),
		expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, {
			message: "Expiry date must be in MM/YY format",
		}),
		cvv: z.string().length(3, { message: "CVV must be 3 digits" }),
	});

	const fetchCardData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:5000/cards/${cardId}`);
			if (!response.ok) throw new Error("Failed to fetch card data");
			const data = await response.json();
			setForm({
				cardNumber: data?.cardNumber || "",
				cardHolderName: data?.cardHolderName || "",
				expiryDate: data?.expiryDate || "",
				cvv: data?.cvv || "",
			});
		} catch (error) {
			console.error("Error fetching card data:", error);
			setFeedbackMessage({
				type: "error",
				message: "Failed to fetch card data.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCardData();
	}, [cardId]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const editCard = async () => {
		setIsLoading(true);
		const validation = cardSchema.safeParse(form);

		if (!validation.success) {
			const resultError = validation.error.format();
			setError({
				cardNumber: resultError.cardNumber?._errors?.[0],
				cardHolderName: resultError.cardHolderName?._errors?.[0],
				expiryDate: resultError.expiryDate?._errors?.[0],
				cvv: resultError.cvv?._errors?.[0],
			});
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch(`http://localhost:5000/cards/${cardId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (!response.ok) throw new Error("Failed to update card");

			setFeedbackMessage({
				type: "success",
				message: "Card updated successfully!",
			});
		} catch (error) {
			console.error("Error updating card:", error);
			setFeedbackMessage({
				type: "error",
				message: "Failed to update card.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-4 max-w-lg rounded-lg border-[#E4E4E7] border mx-auto">
			<p className="text-lg font-bold">Edit Bank Card</p>

			{feedbackMessage.type && (
				<div
					className={`mt-4 p-2 rounded-md text-sm ${
						feedbackMessage.type === "success"
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
				>
					{feedbackMessage.message}
				</div>
			)}

			<div className="mt-4">
				<label className="block font-medium">Card Number</label>
				<input
					type="text"
					name="cardNumber"
					placeholder="Enter your card number"
					className={`border rounded-md w-full p-2 mt-1 ${
						error.cardNumber ? "border-red-500" : ""
					}`}
					value={form.cardNumber}
					onChange={onChange}
				/>
				{error.cardNumber && (
					<div className="text-red-500 text-sm">{error.cardNumber}</div>
				)}
			</div>

			<div className="mt-4">
				<label className="block font-medium">Cardholder Name</label>
				<input
					type="text"
					name="cardHolderName"
					placeholder="Enter cardholder name"
					className={`border rounded-md w-full p-2 mt-1 ${
						error.cardHolderName ? "border-red-500" : ""
					}`}
					value={form.cardHolderName}
					onChange={onChange}
				/>
				{error.cardHolderName && (
					<div className="text-red-500 text-sm">{error.cardHolderName}</div>
				)}
			</div>

			<div className="mt-4">
				<label className="block font-medium">Expiry Date</label>
				<input
					type="text"
					name="expiryDate"
					placeholder="MM/YY"
					className={`border rounded-md w-full p-2 mt-1 ${
						error.expiryDate ? "border-red-500" : ""
					}`}
					value={form.expiryDate}
					onChange={onChange}
				/>
				{error.expiryDate && (
					<div className="text-red-500 text-sm">{error.expiryDate}</div>
				)}
			</div>

			<div className="mt-4">
				<label className="block font-medium">CVV</label>
				<input
					type="text"
					name="cvv"
					placeholder="Enter CVV"
					className={`border rounded-md w-full p-2 mt-1 ${
						error.cvv ? "border-red-500" : ""
					}`}
					value={form.cvv}
					onChange={onChange}
				/>
				{error.cvv && <div className="text-red-500 text-sm">{error.cvv}</div>}
			</div>

			<button
				onClick={editCard}
				className={`mt-6 w-full p-2 bg-black text-white rounded-md ${
					isLoading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isLoading}
			>
				{isLoading ? "Saving..." : "Save changes"}
			</button>
		</div>
	);
}
