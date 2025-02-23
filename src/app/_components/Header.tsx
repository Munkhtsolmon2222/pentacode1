"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuCoffee } from "react-icons/lu";
import { User } from "../constants/type";
import { deleteCookie } from "cookies-next";
import { ChevronDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
	const [userData, setUserData] = useState<User | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | null>(null);
	const pathName = usePathname();
	const accessToken = Cookies.get("accessToken");

	useEffect(() => {
		const storedUserId: string | null = localStorage.getItem("userId");
		setUserId(storedUserId);
	}, []);

	const fetchData = async () => {
		console.log("fetchData");
		try {
			if (!userId) return;
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/profile/currentuser/${userId}`,
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
		console.log("useeffect");
		fetchData();
	}, [userId]);

	const logout = () => {
		deleteCookie("accessToken");
		deleteCookie("refreshToken");
		setUserData(null);
		setDropdownOpen(false);
		window.location.href = "/login";
	};
	console.log(userData);
	return (
		<div className="bg-white p-4 fixed top-0 w-full z-10">
			<div className="flex justify-between w-[90%] mx-20">
				<div className="flex gap-2 items-center font-bold">
					<Link href="/home">
						<div className="flex gap-2 items-center font-bold h-10">
							<LuCoffee className="text-2xl" />
							Buy Me Coffee
						</div>
					</Link>
				</div>

				<div className="flex justify-between items-center max-w-[168px] h-10 relative">
					{userData && (
						<div
							className="flex items-center gap-2 cursor-pointer"
							onClick={() => setDropdownOpen((prev) => !prev)}
						>
							<img
								className="w-10 h-10 object-cover rounded-full "
								src={userData.avatarImage}
								alt="User Avatar"
							/>
							<h4 className=" whitespace-nowrap ">{userData.name}</h4>
							<div className="mt-2">
								<DropdownMenu>
									<DropdownMenuTrigger>
										<ChevronDown />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<Link href="/accountSettings">
											<DropdownMenuLabel>
												<button>My Account</button>
											</DropdownMenuLabel>
										</Link>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<button
												onClick={logout}
												className="w-full text-red-600 font-bold py-2 px-4 text-left rounded-md"
											>
												Log out
											</button>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
