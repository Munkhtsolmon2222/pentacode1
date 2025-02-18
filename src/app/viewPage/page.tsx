"use client";

import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import EditProfileDialogue from "../_components/profile/EditProfileDialogue";
import { User } from "../constants/type";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export default function ViewPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId: string | null = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/currentuser/${userId}`,
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
        <div className="w-[45%] bg-[#ffffff] rounded-md">
          <div className="gap-3 border rounded-md p-4">
            <div className="flex justify-between border-b-[1px] pb-6 mt-4">
              <div className="flex items-center gap-2 ml-4">
                <img
                  className="w-6 h-6 rounded-full"
                  src={userData?.avatarImage}
                  alt="Jake"
                />
                <p className="font-bold text-2xl">{userData?.name}</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-[12%] rounded-md bg-[#F4F4F5] p-2"
              >
                Edit page
              </button>
              {modalOpen && <EditProfileDialogue onClose={setModalOpen} />}
            </div>
            <div className="mt-10 ml-4">
              <p className="text-xl font-semibold">About {userData?.name}</p>
              <p className="max-w-[80%] my-4 text-lg">{userData?.about}</p>
            </div>
          </div>
          <div className=" gap-3 border rounded-md mt-4 p-4 ">
            <p className="text-xl font-semibold p-2 mt-2 ml-2">
              Social media URL
            </p>
            <input
              className="w-full my-4 p-2 rounded-md outline-none text-lg ml-2"
              type="url"
              placeholder="https://buymecoffee.com/spacerulz44"
              value={userData?.socialMediaURL}
            />
          </div>
          <div className=" gap-6 border rounded-md mt-4 p-4">
            <h1 className="text-xl font-semibold p-2 mt-4 ml-2">
              Recent Supporters
            </h1>
            <div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
              <FaHeart />
              <p className="mt-2 text-lg ">
                Be the first one to support {userData?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
          <div className="mb-4">
            <p className="text-xl font-bold mt-2">
              Buy {userData?.name} a Coffee
            </p>
            <p className="text-[#09090B] text-lg mt-5">Select amount:</p>
            <div className="w-[100%] flex gap-4 mt-4 ">
              <button className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md flex justify-center items-center gap-2">
                <FiCoffee /> $1
              </button>
              <button className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md flex justify-center items-center gap-2">
                <FiCoffee /> $2
              </button>
              <button className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md flex justify-center items-center gap-2">
                <FiCoffee />
                $5
              </button>
              <button className="w-20 p-2 bg-[#F4F4F5] rounded-md text-[#18181B] font-md flex justify-center items-center gap-2">
                {" "}
                <FiCoffee />
                $10
              </button>
            </div>
          </div>
          <div className="mb-7">
            <p className="text-[#09090B] text-lg mt-6">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              className="w-full border rounded-md p-2 mt-4 outline-none text-lg "
              placeholder="bymecoffee@gmail.com"
              type="url"
            />
          </div>
          <div className="mb-10">
            <p className="text-[#09090B] text-lg ">Special message:</p>
            <textarea
              className="w-full border rounded-md px-4 py-2 mt-4 outline-none text-lg "
              placeholder="Please write your message here"
            />
          </div>
          <div className="flex items-center mt-4">
            <button className="w-full bg-gray-300 text-white rounded-md font-md p-2">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
