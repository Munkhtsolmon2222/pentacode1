"use client";
import { use, useEffect, useState } from "react";
import UserProfile from "../_components/UserProfile";

export default function Home() {
	const [currentUser, setCurrentUser] = useState();
	const userId = localStorage.getItem("userId");
	console.log(userId);
	const fetchData = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/profile/currentuser/${userId}`
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			setCurrentUser(resJson);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	console.log(currentUser);
	return (
		<div>
			<UserProfile />
			{/* {userId} */}
		</div>
	);
}
