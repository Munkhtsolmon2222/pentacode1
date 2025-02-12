"use client";
import { use, useEffect, useState } from "react";
import UserProfile from "../_components/UserProfile";
// import RecentSupport from "../_components/supporters/RecentSupportersHome";

export default function Home() {
	const [transactions, setTransactions] = useState<any[]>([]);
	const userId = localStorage.getItem("userId");
	console.log(userId);
	const fetchData = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/donation/recieved/${userId}`
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			setTransactions(resJson);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	console.log(transactions);
	return (
		<div className="w-full flex flex-col">
			<UserProfile />
			{/* <div className="max-w-[909px] mx-auto mt-16 p-5 border border-solid rounded-lg">
        {transactions?.map((transaction: any) => (
          <RecentSupport key={transaction?.id} transaction={transaction} />
        ))}
      </div> */}
		</div>
	);
}
