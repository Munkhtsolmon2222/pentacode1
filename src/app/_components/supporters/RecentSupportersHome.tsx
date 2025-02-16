"use client";
import { Transaction, User } from "@/app/constants/type";
import { useEffect, useState } from "react";

export default function RecentSupport({
	transaction,
}: {
	transaction: Transaction;
	user: User | null;
}) {
	const [userData, setUserData] = useState<User | null>(null);

	const profileFetchData = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/profile/viewHome/${transaction.donorId}`,
				{
					credentials: "include",
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
		<div className="w-full mt-4 p-5">
			<div className="w-6 h-6 rounded-full flex gap-2 items-center">
				<img src={userData?.avatarImage} alt="User Avatar" />
				<div className="">
					<h1 className="text-[#71717A] text-xs">{userData?.name}</h1>
					<h3 className="text-[#71717A] text-xs">
						{transaction?.socialURLOrBuyMeACoffee}
					</h3>
				</div>
			</div>
			<div>
				<h3>{transaction?.amount}</h3>
				<h4 className="text-[#71717A] text-xs">{transaction?.updatedAt}</h4>
			</div>
			<p className="pt-4 pl-9">{transaction?.specialMessage}</p>
		</div>
	);
}
