"use client";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";

export default function ViewPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setImageUrl(dataJson.secure_url);
    }
  };
  console.log(imageUrl);
  return (
    <div className="w-full h-screen">
      <div
        className={`w-full h-[320px] bg-[#F4F4F5] flex justify-center items-center`}
      >
        {imageUrl ? (
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="w-full h-[100%] bg-cover bg-no-repeat"
          ></div>
        ) : (
          <label className="w-[181px] h-[40px] bg-[#18181B] text-[#FAFAFA] rounded-md flex justify-center items-center gap-2">
            <CiCamera /> Add a cover image
            <input
              onChange={handleUpload}
              className="w-full h-[319px] bg-[#F4F4F5] hidden"
              type="file"
            />
          </label>
        )}
      </div>
      <div className="flex justify-center gap-6 -my-20">
        <div className="w-[632px] h-[625px] bg-[#ffffff] rounded-md ">
          <div className="h-[233px] gap-[12px] border rounded-md p-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <p className="border rounded-full px-2 py-1 text-sm ">pro</p>
                <p className="font-bold">Jake</p>
              </div>
              <button className="w-[100px] border rounded-md bg-[#F4F4F5] p-2">
                Edit page
              </button>
            </div>
            <div className="mt-4">
              <p className="font-md font-semibold">About Jake</p>
              <p className="">
                I'm a typical person who enjoys exploring different things. I
                also make music art as a hobby. Follow me along.
              </p>
            </div>
          </div>
          <div className="h-[116px] gap-[12px] border rounded-md mt-4 p-4">
            <p className="font-md">Social media URL</p>
            <input
              className="w-full mt-2 p-2 border rounded-md"
              type="url"
              placeholder="https://buymecoffee.com/spacerulz44"
            />
          </div>
          <div className="h-[236px] gap-6 border rounded-md mt-4 p-4">
            <p className="font-md">Recent Supporters</p>
            <div className="w-full h-[160px] border rounded-md mt-4 flex flex-col items-center justify-center">
              <FaHeart className="" />
              <p className="mt-2">Be the first one to support Jake</p>
            </div>
          </div>
        </div>
        <div className="w-[628px] h-[509px] p-6 bg-[#ffffff] border rounded-md ">
          <div className="mb-6">
            <p className="text-xl font-bold">Buy Jake a Coffee</p>
            <p className="text-[#09090B] font-md mt-4">Select amount:</p>
            <div className="flex gap-4 mt-3">
              {[1, 2, 5, 10].map((amount) => (
                <button
                  key={amount}
                  className="w-20 h-8 bg-[#F4F4F5] rounded-md text-[#18181B] font-md border hover:border-[#18181B] flex justify-center items-center gap-2"
                >
                  <FiCoffee />${amount}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="text-[#09090B]">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              className="w-full h-12 border rounded-md px-4 mt-2"
              placeholder="@gmail.com"
              type="url"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#09090B]">Special message:</p>
            <textarea
              className="w-full h-32 border rounded-md px-4 py-2 mt-2"
              placeholder="Please write your message here"
            />
          </div>
          <button className="w-full h-12 bg-[#18181B] opacity-20 text-white rounded-md font-md hover:bg-[#18181B]">
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
