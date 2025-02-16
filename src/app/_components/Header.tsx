"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuCoffee } from "react-icons/lu";
import { User } from "../constants/type";
import { getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { getUserId } from "@/utils/userId";

export default function Header() {
	const [userData, setUserData] = useState<User | null>(null);
	const [userId, setUserId] = useState<string>();

	useEffect(() => {
		getUserId().then((userId) => {
			setUserId(userId);
		});
	}, []);

	const fetchData = async () => {
		try {
			if (!userId) return;
			const res = await fetch(
				`http://localhost:5000/profile/currentuser/${userId}`,
				{
					credentials: "include",
				}
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			setUserData(resJson);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const logout = () => {
		deleteCookie("accessToken");
		deleteCookie("refreshToken");
		setUserData(null);

		window.location.href = "/login";
	};

	return (
		<div>
			<div className="py-4 flex justify-between w-[90%] mx-20 mb-4">
				<div className="flex gap-2 items-center font-bold">
					<Link href="/">
						<div className="flex gap-2 items-center font-bold h-10">
							<LuCoffee className="text-2xl" />
							Buy Me Coffee
						</div>
					</Link>
				</div>
				<div className="flex justify-between items-center max-w-[168px]">
					<div className="w-10 h-10 rounded-full flex items-center gap-2">
						{userData && (
							<>
								<img
									className="rounded-full"
									src={userData.avatarImage}
									alt="User Avatar"
								/>
								<h4>{userData.name}</h4>
							</>
						)}
					</div>
					<button
						onClick={logout}
						className="text-red-600 font-bold absolute z-50"
					>
						Log out
					</button>
				</div>
			</div>
		</div>
	);
}
