"use client"
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { z  } from "zod";


export default function CreateProfile() {
  const [name, setName] = useState<typeof nameSchema>()
  const createProfile = z.object({
  photo : z.string(),
  name : z.string() ,
  about : z.string() ,
  socialmedia : z.string()
  }) 
  const nameSchema = z.string().min(2)
  const validate = (e:any) => {
     setName(e.target.value);
  }
  console.log(name)
  return (
    <div className="p-4 max-w-md mx-auto">
          <p className="text-lg font-bold">Complete your profile page</p>
         
          <h4 className="mt-4 font-medium">Add photo</h4>
          <label className=" mt-2 rounded-full w-40 h-40 border-dashed border-2 flex justify-center items-center">
            <input type="file" hidden />
            <FiCamera className="text-2xl text-[#18181B80]" />
          </label>
     
          <div className="mt-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name here"
              className="border rounded-md w-full p-2 mt-1"
              onChange={(e) => {validate(e)}}
            />
          </div>
     
          <div className="mt-4">
            <label className=" font-medium">About</label>
            <textarea
              placeholder="Write about yourself here"
              className="border rounded-md w-full p-2 mt-1"
            />
          </div>
     
          <div className="mt-4">
            <label className="block font-medium">Social media URL</label>
            <input
              type="text"
              placeholder="https://"  
              className="border rounded-md w-full p-2 mt-1"
            />
          </div>
         
            <button className="mt-6 lg:w-60 md:w-40  p-2 bg-[#18181B] text-white py-2 rounded-md ">
          Continue
          </button>
         
        </div>
 
  );
}