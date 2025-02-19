"use client";

import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import EditProfileDialogue from "../_components/profile/EditProfileDialogue";
import { Transaction, User } from "../constants/type";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { accessToken } from "@/utils/accessToken";
import RecentSupportProfile from "../_components/supporters/RecentSupportersProfile";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ViewPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [userId, setUserId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recipientDonation, setRecipientDonation] = useState(false);
  const [supporters, setSupporters] = useState(3);
  const [bgImg, setbgImg] = useState<any>(null);

  useEffect(() => {
    const storedUserId: string | null = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log(storedUserId);
  }, []);
  console.log(userId);
  const fetchData = async () => {
    if (!userId) {
      console.warn("No userId found, skipping fetch.");
      return;
    }
    try {
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
      setUserData(resJson);
      setbgImg(resJson.backgroundImage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);
  console.log(userData);

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
    editProfileBgImg();
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
      setbgImg(false);
    }
  };

  useEffect(() => {
    setImageUrl(previewImg);
  }, [isSaved, previewImg]);

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

  const editProfileBgImg = async () => {
    const bgImage = localStorage.getItem("coverImage");
    console.log(bgImage);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            backgroundImage: bgImage,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const seeMore = () => {
    if (supporters > 3) {
      setSupporters(3);
    } else {
      setSupporters(supporters + 7);
    }
  };

  return (
    <div className="w-full h-screen mt-[80px]">
      <div className="w-full h-[320px] bg-[#F4F4F5] flex justify-center items-center">
        {previewImg || bgImg ? (
          <div
            style={{
              backgroundImage: `url(${bgImg || imageUrl || previewImg})`,
            }}
            className="w-full h-full bg-cover bg-no-repeat relative"
          >
            {isSaved || bgImg ? (
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
        <div className="w-[45%] bg-[#ffffff] rounded-md">
          <div className="gap-3 border rounded-md p-4">
            <div className="flex justify-between border-b-[1px] pb-6 mt-4">
              <div className="flex items-center gap-2 ml-4">
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData?.avatarImage}
                  alt="Jake"
                />
                <p className="font-bold text-lg">{userData?.name}</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className=" rounded-sm bg-[#F4F4F5] p-2 text-sm"
              >
                Edit page
              </button>
              {modalOpen && <EditProfileDialogue onClose={setModalOpen} />}
            </div>
            <div className="mt-10 ml-4">
              <p className="text-md text-[#18181B] font-semibold">
                About {userData?.name}
              </p>
              <p className="w-full mt-8 text-sm">{userData?.about}</p>
            </div>
          </div>
          <div className=" gap-3 border rounded-md mt-4 p-4 ">
            <p className="text-md font-semibold p-2 mt-2 ml-2">
              Social media URL
            </p>
            <input
              className="w-full my-4 p-2 rounded-md outline-none text-sm ml-2"
              type="url"
              placeholder="https://buymecoffee.com/spacerulz44"
              value={userData?.socialMediaURL}
            />
          </div>
          <div className="max-h-[20rem] gap-6 border rounded-md mt-4 overflow-y-auto custom-scrollbar overflow-hidden ">
            <h1 className="text-md font-semibold p-6 ml-2 sticky top-0 bg-white">
              Recent Supporters
            </h1>
            <div>
              {recipientDonation ? (
                <div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
                  <FaHeart />
                  <p className="mt-2 text-sm ">
                    Be the first one to support {userData?.name}
                  </p>
                </div>
              ) : (
                <div className="w-full p-2 gap-2">
                  {transactions?.slice(0, supporters).map((transaction) => (
                    <RecentSupportProfile
                      transaction={transaction}
                      key={transaction.id}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="max-w-[950px] px-12">
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
        </div>
        <div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
          <div className="mb-4">
            <p className="text-lg font-bold mt-2">
              Buy {userData?.name} a Coffee
            </p>
            <p className="text-[#09090B] text-sm mt-5">Select amount:</p>
            <div className=" flex gap-4 mt-4 text-sm">
              <button className="p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-sm flex justify-center items-center gap-2">
                <FiCoffee /> $1
              </button>
              <button className=" p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-sm flex justify-center items-center gap-2">
                <FiCoffee /> $2
              </button>
              <button className=" p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-sm flex justify-center items-center gap-2">
                <FiCoffee />
                $5
              </button>
              <button className=" p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-sm flex justify-center items-center gap-2">
                {" "}
                <FiCoffee />
                $10
              </button>
            </div>
          </div>
          <div className="mb-7">
            <p className="text-[#09090B] text-sm mt-6">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              className="w-full border rounded-md p-2 mt-4 outline-none text-sm "
              placeholder="bymecoffee@gmail.com"
              type="url"
            />
          </div>
          <div className="mb-10">
            <p className="text-[#09090B] text-sm ">Special message:</p>
            <textarea
              className="w-full border rounded-md px-4 py-2 mt-4 outline-none text-sm "
              placeholder="Please write your message here"
            />
          </div>
          <div className="flex items-center mt-4">
            <button className="w-full bg-gray-300 text-white rounded-md text-sm p-2">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
