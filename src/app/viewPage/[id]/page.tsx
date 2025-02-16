"use client";

import EditProfileDialogue from "@/app/_components/profile/EditProfileDialogue";
import { Creator, Transaction, User } from "@/app/constants/type";
import { getUserId } from "@/utils/userId";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { string, z } from "zod";
import Complete from "./compelete";
import { Button } from "@/components/ui/button";

export default function ViewPageExplore() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [previewImg, setPreviewImg] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [userData, setUserData] = useState<User>();
	const params = useParams();
	const [newDonation, setNewDonation] = useState({
		donorId: "",
		amount: 0,
		specialMessage: "",
		socialURLOrBuyMeACoffee: "",
		recipientId: "",
	});
	const [userId, setUserId] = useState<string>();

	useEffect(() => {
		const savedImage = localStorage.getItem("coverImage");
		if (!savedImage) {
			setImageUrl(savedImage);
		}
	}, []);

	const handleSave = () => {
		if (imageUrl) {
			localStorage.setItem("coverImage", imageUrl);
		}
		setIsSaved(!isSaved);
	};

	const handleCancel = () => {
		localStorage.removeItem("coverImage");
		setIsSaved(false);
		setPreviewImg(null);
	};

	const handleUploadChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", "food-delivery");

			setLoading(true);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/do0qq0f0b/upload`,
				{
					method: "POST",
					body: data,
				}
			);

			const dataJson = await response.json();
			setIsSaved(false);
			setPreviewImg(dataJson.secure_url);
		}
	};

	useEffect(() => {
		setImageUrl(previewImg);
	}, [isSaved, previewImg]);
	const [error, setError] = useState<{
		socialURLOrBuyMeACoffee?: string;
	}>({});

	const fetchData = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/profile/view/${params?.id}`,
				{
					credentials: "include",
				}
			);
			if (!res.ok) throw new Error("Failed to fetch user data");
			const resJson = await res.json();
			console.log(res);
			setUserData(resJson);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(params.id);
	useEffect(() => {
		fetchData();
	}, [params?.id]);
	console.log(userData);
	const handleDisabled = () => {
		if (error.socialURLOrBuyMeACoffee == undefined) {
			return false;
		} else {
			return true;
		}
	};
	useEffect(() => {
		if (isClicked) {
			const validation = viewPageSchema.safeParse(newDonation);
			if (!validation.success) {
				const resultError = validation.error.format();
				setError({
					socialURLOrBuyMeACoffee:
						resultError.socialURLOrBuyMeACoffee?._errors[0],
				});
			} else {
				setError({});
			}
		}
	}, [isClicked, newDonation]);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		const Update = { ...newDonation, [name]: value };
		setNewDonation(Update);
		console.log(Update);
	};

	const onChangeAmount = (amount: number) => {
		// Update the amount in newDonation state
		setNewDonation((prev) => ({ ...prev, amount }));
	};
  const onChangeAmount = (amount: number) => {
    setNewDonation((prev) => ({ ...prev, amount }));
  };

	const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// Update the specialMessage in newDonation state
		const { value } = e.target;
		setNewDonation((prev) => ({ ...prev, specialMessage: value }));
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
		const response = await fetch("http://localhost:5000/donation", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				donorId,
				amount,
				specialMessage,
				socialURLOrBuyMeACoffee,
				recipientId,
			}),
		});
		const data = await response.json();
		console.log(data);
	};

	console.log(newDonation);
	return (
		<div className="w-full min-h-screen">
			<div className="w-full h-[320px] bg-[#F4F4F5] flex justify-center items-center">
				{previewImg ? (
					<div
						style={{
							backgroundImage: `url(${imageUrl || previewImg})`,
						}}
						className="w-full h-full bg-cover bg-no-repeat relative"
					>
						{isSaved ? (
							<div className="flex absolute right-10 top-4">
								<label className="w-[150px] h-[40px] bg-[#F4F4F5] text-[#18181B] rounded-md flex justify-center items-center gap-2">
									<CiCamera /> Change cover
									<input
										onChange={handleUploadChange}
										className="hidden"
										type="file"
									/>
								</label>
							</div>
						) : (
							<div className="w-[217px] h-[40px] gap-4 flex justify-between absolute right-10 top-4">
								<button
									className="w-[126px] h-[40px] bg-[#18181B] text-[#FAFAFA] rounded-md"
									onClick={handleSave}
								>
									Save changes
								</button>
								<button
									className="w-[79px] h-[40px] bg-[#F4F4F5] text-[#18181B] rounded-md"
									onClick={handleCancel}
								>
									Cancel
								</button>
							</div>
						)}
					</div>
				) : (
					<label className="w-[11.3rem] h-[2.5rem] bg-[#18181B] text-[#FAFAFA] rounded-md flex justify-center items-center gap-2">
						<CiCamera /> Add a cover image
						<input
							onChange={handleUploadChange}
							className="w-full h-[19.9rem] bg-[#F4F4F5] hidden"
							type="file"
						/>
					</label>
				)}
			</div>
			<div className="w-full flex justify-center gap-6 -my-20 relative">
				<div className="w-[45%] h-[50rem] bg-[#ffffff] rounded-md">
					<div className="min-h-[20rem] gap-3 border rounded-md p-4">
						<div className="flex justify-between border-b-[1px] pb-6 mt-4">
							<div className="w-6 h-6 rounded-full flex items-center gap-2">
								<img src={userData?.avatarImage} alt="Jake" />
								<p className="font-bold text-2xl">{userData?.name}</p>
							</div>
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

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log("User ID:", userId);

  const supporterFetchData = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/donation/received/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");

      const resJson = await res.json();
      console.log("API Response:", resJson);

      setTransactions(
        Array.isArray(resJson.donations) ? resJson.donations : []
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    supporterFetchData();
  }, [userId]);

  return (
    <div className="w-full min-h-screen">
      {buttonClicked ? (
        <div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
          <div className=" flex flex-col items-center p-2">
            <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] flex justify-center items-center">
              <CheckCircle2 className="text-white" />
            </div>
            <p className="font-bold mt-4 px-1 py-2">Donation Complete ! </p>
          </div>

          <div className="max-w-[510px] p-4 border rounded-md">
            <div className="w-6 h-6 flex rounded-full m-2">
              <img src={userData?.avatarImage} alt="User" />
              <p>{userData?.name}</p>
            </div>
            <p className="m-2">
              Thank you for supporting me! It means a lot to have your support.
              It’s a step toward creating a more inclusive and accepting
              community of artists.
            </p>
          </div>
          <div className="flex justify-center items-center p-4">
            <button
              className="bg-[#18181B] p-4 text-white border rounded-lg"
              onClick={() => window.location.reload()}
            >
              Return to explore
            </button>
          </div>
        </div>
      ) : (
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
              <div className="min-h-[20rem] gap-3 border rounded-md p-4">
                <div className="flex justify-between border-b-[1px] pb-6 mt-4">
                  <div className="w-6 h-6 rounded-full flex items-center gap-2">
                    <img src={userData?.avatarImage} alt="Jake" />
                    <p className="font-bold text-2xl">{userData?.name}</p>
                  </div>

							{modalOpen && <EditProfileDialogue onClose={setModalOpen} />}
						</div>
						<div className="mt-10 ml-4">
							<p className="text-xl font-semibold">About {userData?.name}</p>
							<p className="max-w-[39.5rem] mt-8">{userData?.about}</p>
						</div>
					</div>
					<div className="h-[10rem] gap-3 border rounded-md mt-4 p-4">
						<p className="font-md mt-4">Social media URL</p>
						<input
							className="w-full mt-4 p-2 border rounded-md outline-none"
							type="url"
							placeholder="https://buymecoffee.com/spacerulz44"
							value={userData?.socialMediaURL}
						/>
					</div>
					<div className="h-[20rem] gap-6 border rounded-md mt-4 p-4">
						<p className="font-md mt-4">Recent Supporters</p>
						<div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
							<FaHeart />
							<p className="mt-2">
								Be the first one to support {userData?.name}
							</p>
						</div>
					</div>
				</div>
				<div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
					<div className="mb-4">
						<p className="text-xl font-bold mt-4">
							Buy {userData?.name} a Coffee
						</p>
						<p className="text-[#09090B] font-md mt-5">Select amount:</p>
						<div className="w-[100%] flex gap-4 mt-4">
							<button
								onClick={() => onChangeAmount(1)}
								className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
							>
								<FiCoffee /> $1
							</button>
							<button
								onClick={() => onChangeAmount(2)}
								className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
							>
								<FiCoffee /> $2
							</button>
							<button
								onClick={() => onChangeAmount(5)}
								className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
							>
								<FiCoffee /> $5
							</button>
							<button
								onClick={() => onChangeAmount(10)}
								className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
							>
								<FiCoffee /> $10
							</button>
						</div>
					</div>
					<div className="mb-7">
						<p className="text-[#09090B] mt-6">
							Enter BuyMeCoffee or social account URL:
						</p>
						<input
							className={`w-full p-2 border rounded-md px-4 mt-4 outline-none 
                  {modalOpen && <EditProfileDialogue onClose={setModalOpen} />}
                </div>
                <div className="mt-10 ml-4">
                  <p className="text-xl font-semibold">
                    About {userData?.name}
                  </p>
                  <p className="max-w-[39.5rem] mt-8">{userData?.about}</p>
                </div>
              </div>
              <div className="h-[10rem] gap-3 border rounded-md mt-4 p-4">
                <p className="font-md mt-4">Social media URL</p>
                <input
                  className="w-full mt-4 p-2 border rounded-md outline-none"
                  type="url"
                  placeholder="https://buymecoffee.com/spacerulz44"
                  value={userData?.socialMediaURL}
                />
              </div>
              <div className="max-h-[20rem] gap-6 border rounded-md mt-4 p-4 overflow-y-auto custom-scrollbar">
                <h1 className="font-md font-bold p-2 mt-4">
                  Recent Supporters
                </h1>
                <div className="w-full p-2 gap-2">
                  {transactions?.map((transaction) => (
                    <div className="w-full flex gap-2 p-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={transaction?.avatarImage}
                      />
                      <div className="w-full">
                        <h4 className="font-semibold">{transaction?.name}</h4>
                        <h4>bought ${transaction.amount} coffee</h4>
                        <h4>{transaction?.specialMessage}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
                  <FaHeart />
                  <p className="mt-2">
                    Be the first one to support {userData?.name}
                  </p>
                </div> */}
              </div>
            </div>
            <div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
              <div className="mb-4">
                <p className="text-xl font-bold mt-4">
                  Buy {userData?.name} a Coffee
                </p>
                <p className="text-[#09090B] font-md mt-5">Select amount:</p>
                <div className="w-[100%] flex gap-4 mt-4">
                  <Button
                    onClick={() => onChangeAmount(1)}
                    className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
                  >
                    <FiCoffee /> $1
                  </Button>
                  <Button
                    onClick={() => onChangeAmount(2)}
                    className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
                  >
                    <FiCoffee /> $2
                  </Button>
                  <Button
                    onClick={() => onChangeAmount(5)}
                    className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
                  >
                    <FiCoffee /> $5
                  </Button>
                  <Button
                    onClick={() => onChangeAmount(10)}
                    className="w-20 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
                  >
                    <FiCoffee /> $10
                  </Button>
                </div>
              </div>
              <div className="mb-7">
                <p className="text-[#09090B] mt-6">
                  Enter BuyMeCoffee or social account URL:
                </p>
                <input
                  className={`w-full p-2 border rounded-md px-4 mt-4 outline-none 
              
              `}
							placeholder="bymecoffee@gmail.com"
							type="url"
							name="socialURLOrBuyMeACoffee"
							onChange={onChange}
						/>
					</div>
					<div className="mb-10">
						<p className="text-[#09090B]">Special message:</p>
						<textarea
							onChange={onChangeMessage}
							value={newDonation.specialMessage || ""}
							className="w-full border rounded-md px-4 py-2 mt-4 outline-none"
							placeholder="Please write your message here"
						/>
					</div>

					{buttonClicked ? (
						<div className="flex">
							{isClicked ? (
								<button
									disabled={handleDisabled()}
									onClick={async () => {
										await addDonation(
											userId,
											newDonation.amount,
											newDonation.specialMessage,
											newDonation.socialURLOrBuyMeACoffee,
											userData?.userId ?? ""
										);
										setButtonClicked(false); // Reset the buttonClicked to false after donation is made
									}}
									className="w-full p-2 bg-[#18181B] text-white rounded-md font-md hover:bg-[#18181B]"
								>
									Support
								</button>
							) : (
								<button
									onClick={() => setIsClicked(true)} // Mark isClicked true when Support is clicked
									className="w-full p-2 bg-[#18181B] opacity-20 text-white rounded-md font-md hover:bg-[#18181B]"
								>
									Support
								</button>
							)}
						</div>
					) : (
						<div className="w-full flex flex-col items-center">
							<div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] flex justify-center items-center">
								<CheckCircle2 />
							</div>
							<p>Donation Complete!</p>
							<div>
								<div className="w-6 h-6 rounded-full">
									<img src={userData?.avatarImage} alt="User" />
									<p>{userData?.name}</p>
								</div>
								<p>
									Thank you for supporting me! It means a lot to have your
									support. It’s a step toward creating a more inclusive and
									accepting community of artists.
								</p>
							</div>
							<div className="flex justify-center items-center">
								<button
									className="bg-[#18181B] p-4 text-white"
									onClick={() => window.location.reload()}
								>
									Return to explore
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
                  placeholder="bymecoffee@gmail.com"
                  type="url"
                  name="socialURLOrBuyMeACoffee"
                  onChange={onChange}
                />
              </div>
              <div className="mb-10">
                <p className="text-[#09090B] font-semibold">Special message:</p>
                <textarea
                  onChange={onChangeMessage}
                  value={newDonation.specialMessage}
                  className="w-full border rounded-md px-4 py-2 mt-4 outline-none"
                  placeholder="Please write your message here"
                />
              </div>
              <div className="flex">
                <button
                  disabled={handleDisabled()}
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
                  }}
                  className="w-full p-2 bg-[#18181B] text-white rounded-md font-md hover:bg-[#18181B]"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
