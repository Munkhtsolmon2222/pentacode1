"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { z } from "zod";

export default function EditProfile() {
  const params = useParams();
  const profileSchema = z.object({
    photo: z.string().url({ message: "Please upload an image" }),
    name: z
      .string()
      .min(2, { message: "Please enter a name" })
      .regex(/^[A-Za-zА-Яа-я\s]+$/, { message: "Please enter alphabets only" }),
    about: z.string().min(10, { message: "Please enter info about yourself" }),
    socialMedia: z
      .string()
      .startsWith("https://", { message: "Please enter a valid social link" }),
  });

  const [form, setForm] = useState({
    photo: "",
    name: "",
    about: "",
    socialMedia: "",
  });

  const [error, setError] = useState<{
    photo?: string;
    name?: string;
    about?: string;
    socialMedia?: string;
  }>({});

  const [isClicked, setIsClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (isClicked) {
      const validation = profileSchema.safeParse(form);
      if (!validation.success) {
        const resultError = validation.error.format();
        setError({
          photo: resultError.photo?._errors?.[0],
          name: resultError.name?._errors?.[0],
          about: resultError.about?._errors?.[0],
          socialMedia: resultError.socialMedia?._errors?.[0],
        });
      } else {
        setError({});
      }
    }
  }, [isClicked, form]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/do0qq0f0b/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const dataJson = await response.json();
      setImageUrl(dataJson.secure_url);
      setForm((prev) => ({ ...prev, photo: dataJson.secure_url }));
    }
  };
  const editProfile = async (
    name: string,
    about: string,
    photo: string,
    socialMedia: string
  ) => {
    setIsClicked(true);
    console.log("baaska");
    const response = await fetch(`http://localhost:5000/profile/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name,
        about,
        avatarImage: photo,
        socialMediaURL: socialMedia,
      }),
    });
  };

  return (
    <div className="p-4 max-w-lg rounded-lg border-[#E4E4E7] border mx-auto">
      <p className="text-lg font-bold">Personal info</p>

      <h4 className="mt-4 font-medium">Add photo</h4>
      <label
        className={`mt-2 rounded-full w-40 h-40 border-dashed border-2 flex justify-center items-center ${
          error.photo ? "border-red-500" : ""
        }`}
      >
        <input type="file" hidden onChange={onFileChange} />
        {imageUrl ? (
          <img
            src={imageUrl}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FiCamera className="text-2xl text-gray-500" />
        )}
      </label>
      {error.photo && (
        <div className="text-red-500 text-sm flex items-center gap-1 pt-2">
          <VscError />
          {error.photo}
        </div>
      )}

      <div className="mt-4">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name here"
          className={`border rounded-md w-full p-2 mt-1 ${
            error.name ? "border-red-500" : ""
          }`}
          value={form.name}
          onChange={onChange}
        />
        {error.name && (
          <div className="text-red-500 text-sm flex items-center gap-1 pt-2">
            <VscError />
            {error.name}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="font-medium">About</label>
        <textarea
          name="about"
          placeholder="Write about yourself here"
          className={`border rounded-md w-full p-2 mt-1 ${
            error.about ? "border-red-500" : ""
          }`}
          value={form.about}
          onChange={onChange}
        />
        {error.about && (
          <div className="text-red-500 text-sm">{error.about}</div>
        )}
      </div>

      <div className="mt-4">
        <label className="block font-medium">Social media URL</label>
        <input
          type="text"
          name="socialMedia"
          placeholder="https://"
          className={`border rounded-md w-full p-2 mt-1 ${
            error.socialMedia ? "border-red-500" : ""
          }`}
          value={form.socialMedia}
          onChange={onChange}
        />
        {error.socialMedia && (
          <div className="text-red-500 text-sm">{error.socialMedia}</div>
        )}
      </div>

      <button
        onClick={() => {
          editProfile(form.name, form.about, form.photo, form.socialMedia);
        }}
        className="mt-6 w-full p-2 bg-black text-white rounded-md"
      >
        Save changes
      </button>
    </div>
  );
}
