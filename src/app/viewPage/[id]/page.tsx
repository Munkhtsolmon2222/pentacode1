"use client";

import EditProfileDialogue from "@/app/_components/profile/EditProfileDialogue";
import { Creator, Transaction, User } from "@/app/constants/type";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { string, z } from "zod";
import Complete from "./compelete";
import { Button } from "@/components/ui/button";
import RecentSupportProfile from "@/app/_components/supporters/RecentSupportersProfile";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";

export default function ViewPageExplore() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [previewImg, setPreviewImg] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [userData, setUserData] = useState<User>();
	const [recipientDonation, setRecipientDonation] = useState(false);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [supporters, setSupporters] = useState(3);
	const [scan, setScan] = useState(false);
	const params = useParams();
	const accessToken = Cookies.get("accessToken");
	const [newDonation, setNewDonation] = useState({
		donorId: "",
		amount: 0,
		specialMessage: "",
		socialURLOrBuyMeACoffee: "",
		recipientId: "",
	});
	const [userId, setUserId] = useState<string | null>(null);
	useEffect(() => {
		const storedUserId: string | null = localStorage.getItem("userId");
		setUserId(storedUserId);
	}, []);

	useEffect(() => {
		const savedImage = localStorage.getItem("coverImage");
		if (!savedImage) {
			setImageUrl(savedImage);
		}
	}, []);

	useEffect(() => {
		setImageUrl(previewImg);
	}, [isSaved, previewImg]);

	const donationSchema = z.object({
		socialURLOrBuyMeACoffee: z
			.string()
			.endsWith(".com", { message: "Please enter a valid social link" }),
	});

	const [error, setError] = useState<{
		socialURLOrBuyMeACoffee?: string;
	}>({});

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/profile/view/${params?.id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
				}
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			console.log(res);
			setUserData(resJson);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	console.log(params.id);
	useEffect(() => {
		fetchData();
	}, [params?.id]);

	console.log(userData);

	const handleDisabled = () => {
		return (
			!newDonation.amount ||
			!newDonation.specialMessage.trim() ||
			!newDonation.socialURLOrBuyMeACoffee ||
			error.socialURLOrBuyMeACoffee
		);
	};

	useEffect(() => {
		if (isClicked) {
			const validation = donationSchema.safeParse({
				socialURLOrBuyMeACoffee: newDonation.socialURLOrBuyMeACoffee,
			});
			if (!validation.success) {
				const resultError = validation.error.format();
				console.log(error);
				setError({
					socialURLOrBuyMeACoffee:
						resultError.socialURLOrBuyMeACoffee?._errors[0],
				});
			} else {
				setError({});
			}
		}
	}, [isClicked, newDonation.socialURLOrBuyMeACoffee]);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		const Update = { ...newDonation, [name]: value };
		setNewDonation(Update);
		console.log(Update);
	};

	const onChangeAmount = (amount: number) => {
		setSelectedAmount(amount);
		setNewDonation((prev) => ({ ...prev, amount }));
	};

	const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setNewDonation((prev) => ({ ...prev, specialMessage: value }));
	};

	const viewPageSchema = z.object({
		socialURLOrBuyMeACoffee: z
			.string()
			.includes(".com", { message: "Please enter a valid social link" }),
	});

	const addDonation = async (
		donorId: any,
		amount: number,
		specialMessage: string,
		socialURLOrBuyMeACoffee: string,
		recipientId: string
	) => {
		setButtonClicked(false);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/donation`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + accessToken,
				},

				body: JSON.stringify({
					donorId,
					amount,
					specialMessage,
					socialURLOrBuyMeACoffee,
					recipientId,
				}),
			}
		);
		const data = await response.json();
		console.log(data);
	};

	console.log(newDonation);

	const handleDonation = async () => {
		await addDonation(
			userId,
			newDonation.amount,
			newDonation.specialMessage,
			newDonation.socialURLOrBuyMeACoffee,
			userData?.userId ?? ""
		);
		setButtonClicked(true);
		setIsClicked(false);
	};

	console.log("User ID:", userId);

	const supporterFetchData = async () => {
		if (!userId) {
			console.warn("No userId found, skipping fetch.");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/donation/${userData?.userId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken,
					},
				}
			);
			if (!res.ok) throw new Error("Failed to fetch user data");

			const resJson = await res.json();
			console.log("API Response:", resJson);

			setTransactions(
				Array.isArray(resJson.allDonations) ? resJson.allDonations : []
			);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			setTransactions([]);
			setRecipientDonation(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		supporterFetchData();
	}, [userData]);
	console.log(transactions);
	const seeMore = () => {
		if (supporters > 3) {
			setSupporters(3);
		} else {
			setSupporters(supporters + 7);
		}
	};

	return (
		<div className="w-full min-h-screen">
			{buttonClicked ? (
				<div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
					<div className=" flex flex-col items-center p-2">
						<div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] flex justify-center items-center">
							<CheckCircle2 className="text-[#FAFAFA]" />
						</div>
						<p className="font-bold mt-4 px-1 py-2">Donation Complete ! </p>
					</div>

					<div className="max-w-[510px] p-4 border rounded-md">
						<div className="flex gap-2 m-2">
							<img
								className="w-10 h-10 flex rounded-full "
								src={userData?.avatarImage}
								alt="User"
							/>
							<p className="mt-2 text-[#09090B]">{userData?.name}:</p>
						</div>
						<p className="m-2">
							Thank you for supporting me! It means a lot to have your support.
							It’s a step toward creating a more inclusive and accepting
							community of artists.
						</p>
					</div>
					<div className="flex justify-center items-center p-4">
						<button
							className="bg-[#18181B] p-4 text-[#FAFAFA] border rounded-lg"
							onClick={() => window.location.reload()}
						>
							Return to explore
						</button>
					</div>
				</div>
			) : (
				<div>
					{scan ? (
						<div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Edit Profile</Button>
								</DialogTrigger>
								<DialogContent className="">
									<DialogHeader>
										<DialogTitle className="flex justify-center text-[#161616] text-lg">
											Scan QR code
										</DialogTitle>
										<DialogDescription className="flex justify-center text-[#161616] text-md">
											Scan the QR code to complete your donation
										</DialogDescription>
									</DialogHeader>
									<div className="flex justify-center my-6">
										<img src="QR.png" alt="" />
									</div>
								</DialogContent>
							</Dialog>
						</div>
					) : (
						<div>
							{loading && <div className="text-center p-4 ">Loading...</div>}
							{!loading && userData && (
								<div>
									<div className="w-full h-[320px] bg-[#F4F4F5] flex justify-center items-center">
										<div
											style={{
												backgroundImage: `url(${imageUrl || previewImg})`,
											}}
											className="w-full h-full bg-cover bg-no-repeat relative"
										>
											{userData?.backgroundImage ? (
												<div className="flex absolute right-10 top-4">
													<label
														className={`w-[150px] h-[40px] bg-[#F4F4F5] text-[#18181B] rounded-md flex justify-center items-center gap-2 bg-cover bg-center`}
														style={{
															backgroundImage: `url(${userData.backgroundImage})`,
														}}
													></label>
												</div>
											) : (
												<div
													className="w-[100%] h-[100%] bg-[#18181B] text-[#FAFAFA] rounded-md flex justify-center items-center gap-2 bg-cover bg-center"
													style={{
														backgroundImage: `url("https://miro.medium.com/v2/resize:fit:4800/format:webp/1*EPdXV6DAFtthI3w-d0XUcg.jpeg")`,
													}}
												></div>
											)}
										</div>
									</div>
									<div className="w-full flex justify-center gap-6 -my-20 relative">
										<div className="w-[45%] h-[50rem] bg-[#ffffff] rounded-md">
											<div className=" gap-3 border rounded-md p-4">
												<div className="flex justify-between border-b-[1px] pb-6 mt-4">
													<div className="flex items-center gap-2 ml-4">
														<img
															className="w-8 h-8 rounded-full"
															src={userData?.avatarImage}
															alt="Jake"
														/>
														<p className="font-bold text-lg">
															{userData?.name}
														</p>
													</div>

													{modalOpen && (
														<EditProfileDialogue onClose={setModalOpen} />
													)}
												</div>
												<div className="mt-10 ml-4">
													<p className="text-md text-[#18181B] font-semibold">
														About {userData?.name}
													</p>
													<p className="w-full my-8 text-sm">
														{userData?.about}
													</p>
												</div>
											</div>
											<div className="gap-3 border rounded-md mt-4 p-4">
												<p className="text-md font-semibold p-2 mt-2 ml-2">
													Social media URL
												</p>
												<input
													className="w-full my-4 ml-2 p-2 text-sm outline-none"
													type="url"
													placeholder="https://buymecoffee.com/spacerulz44"
													value={userData?.socialMediaURL}
												/>
											</div>

											<div className="max-h-[20rem] gap-6 border rounded-md mt-4 overflow-y-auto custom-scrollbar relative">
												<h1 className="text-md font-semibold p-6 ml-2 sticky top-0 bg-white">
													Recent Supporters
												</h1>

												{recipientDonation ? (
													<div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
														<FaHeart />
														<p className="mt-2 text-md">
															Be the first one to support {userData?.name}
														</p>
													</div>
												) : (
													<div className="w-full p-2 gap-2">
														{transactions
															?.slice(0, supporters)
															.map((transaction) => (
																<RecentSupportProfile
																	transaction={transaction}
																	key={transaction.id}
																/>
															))}
													</div>
												)}

												<Button
													onClick={seeMore}
													className="w-full mb-4 sticky bg-[#FAFAFA] text-[#18181B] text-sm p-6"
													variant={"secondary"}
												>
													{supporters > 3 ? "See less" : "See more"}
													<ChevronDown />
												</Button>
											</div>
										</div>
										<div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
											<div className="mb-4">
												<p className="text-lg font-bold mt-2">
													Buy {userData?.name} a Coffee
												</p>
												<p className="text-[#09090B] text-md mt-5">
													Select amount:
												</p>
												<div className="w-[100%] text-bold flex gap-4 mt-2">
													{[1, 2, 5, 10].map((amount) => (
														<Button
															key={amount}
															onClick={() => onChangeAmount(amount)}
															className={`w-20  rounded-md  text-sm ${
																selectedAmount == amount
																	? "bg-black text-white"
																	: "bg-[#F4F4F5] text-[#09090B]"
															} 
               hover:border-[#18181B] flex justify-center items-center gap-2`}
														>
															<FiCoffee /> ${amount}
														</Button>
													))}
												</div>
											</div>
											<div className="mb-6">
												<p className="text-[#09090B] text-md mt-10">
													Enter BuyMeCoffee or social account URL:
												</p>
												<input
													placeholder="bymecoffee@gmail.com"
													type="url"
													name="socialURLOrBuyMeACoffee"
													onChange={onChange}
													className={`border rounded-md w-full p-2 mt-1 text-sm outline-none${
														error.socialURLOrBuyMeACoffee
															? "border-red-500"
															: ""
													}`}
												/>
												{error.socialURLOrBuyMeACoffee && (
													<div className="text-red-500 text-md flex items-center gap-1 pt-2">
														<VscError />
														{error.socialURLOrBuyMeACoffee}
													</div>
												)}
											</div>
											<div className="mb-10">
												<p className="text-[#09090B] text-md">
													Special message:
												</p>
												<textarea
													onChange={onChangeMessage}
													value={newDonation.specialMessage}
													className="w-full border rounded-md px-4 py-2 mt-2 outline-none text-sm"
													placeholder="Please write your message here"
												/>
											</div>

											<div className="flex">
												<button
													disabled={!!handleDisabled()}
													onClick={async () => {
														await addDonation(
															userId,
															newDonation.amount,
															newDonation.specialMessage,
															newDonation.socialURLOrBuyMeACoffee,
															userData?.userId ?? ""
														);
														setButtonClicked(true);
														setIsClicked(true);
														setScan(true);
													}}
													className={`w-full p-2 rounded-md text-sm 
                        ${
													handleDisabled()
														? "bg-[#18181B] opacity-20 text-[#FAFAFA] cursor-not-allowed"
														: "bg-[#18181B] text-[#FAFAFA] hover:bg-[#18181B]"
												}`}
												>
													Support
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
