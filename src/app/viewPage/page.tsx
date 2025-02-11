"use client";

import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import EditProfileDialogue from "../_components/profile/EditProfileDialogue";
import { z } from "zod";
type Donation = {
  donorId: string;
  amount: number;
  specialMessage?: string;
  socialURLOrBuyMeACoffee?: string;
  recipientId: string;
};
type User = {
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
};

export default function ViewPage({
  onClose,
  isEdit,
}: {
  onClose: any;
  isEdit: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [userData, setUserData] = useState<User>();
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/profile/currentuser/${userId}`
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
  console.log(userData);
  const addDonation = async () => {
    const response = await fetch("http://localhost:5000/donation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    setDonations([]);
  }, []);

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
  const [form, setForm] = useState({
    donorId: "",
    amount: 1,
    specialMessage: "",
    socialURLOrBuyMeACoffee: "",
    recipientId: "",
  });

  const [error, setError] = useState<{
    donorId?: string;
    amount?: number;
    specialMessage?: string;
    socialURLOrBuyMeACoffee?: string;
    recipientId?: string;
  }>({});

  const handleDisabled = () => {
    if (
      error.donorId == undefined &&
      error.amount == undefined &&
      error.specialMessage == undefined &&
      error.socialURLOrBuyMeACoffee == undefined &&
      error.recipientId == undefined
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="w-full h-screen">
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
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6 rounded-full"
                  src={userData?.avatarImage}
                  alt="Jake"
                />
                <p className="font-bold text-2xl">{userData?.name}</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-[6.25rem] rounded-md bg-[#F4F4F5] p-2"
              >
                Edit page
              </button>
              {modalOpen && <EditProfileDialogue onClose={setModalOpen} />}
            </div>
            <div className="mt-10 ml-4">
              <p className="text-xl font-semibold">About Jake</p>
              <p className="max-w-[39.5rem] mt-6">{userData?.about}</p>
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
              <p className="mt-2">Be the first one to support Jake</p>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-[40rem] p-6 bg-[#ffffff] border rounded-md">
          <div className="mb-4">
            <p className="text-xl font-bold mt-4">Buy Jake a Coffee</p>
            <p className="text-[#09090B] font-md mt-5">Select amount:</p>
            <div className="w-[100%] flex gap-4 mt-4 ">
              <button className="w-20 h-8 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2">
                <FiCoffee /> $1
              </button>
              <button className="w-20 h-8 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2">
                <FiCoffee /> $2
              </button>
              <button className="w-20 h-8 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2">
                <FiCoffee />
                $5
              </button>
              <button className="w-20 h-8 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2">
                {" "}
                <FiCoffee />
                $10
              </button>
            </div>
          </div>
          <div className="mb-7">
            <p className="text-[#09090B] mt-6">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              className="w-full h-12 border rounded-md px-4 mt-4 outline-none"
              placeholder="bymecoffee@gmail.com"
              type="url"
            />
          </div>
          <div className="mb-16">
            <p className="text-[#09090B]">Special message:</p>
            <textarea
              className="w-full h-32 border rounded-md px-4 py-2 mt-4 outline-none"
              placeholder="Please write your message here"
            />
          </div>
          <div className="flex items-center">
            <button
              disabled={handleDisabled()}
              className="w-full h-12 bg-gray-500 text-white rounded-md font-md"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
