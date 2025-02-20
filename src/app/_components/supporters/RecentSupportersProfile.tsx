"use client";
import { Transaction, User } from "@/app/constants/type";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function RecentSupportProfile({
	transaction,
}: {
	transaction: Transaction;
}) {
	const [userData, setUserData] = useState<User | null>(null);
	const accessToken = Cookies.get("accessToken");

	const profileFetchData = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/profile/viewHome/${transaction.donorId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
				}
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			console.log(resJson);
			setUserData(resJson);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		profileFetchData();
	}, [transaction]);
	console.log(userData);
	return (
		<div className="w-full flex gap-3 p-2 ">
			<img className="w-8 h-8 rounded-full" src={userData?.avatarImage} />
			<div className="flex flex-col">
				<div className="w-full flex gap-2 text-sm">
					<h4 className="font-semibold text-sm">{userData?.name}</h4>
					<h4>bought ${transaction.amount} coffee</h4>
				</div>
				<h4 className="mt-1 text-sm text-[#09090B]">
					{transaction?.specialMessage}
				</h4>
			</div>
		</div>
	);
}
