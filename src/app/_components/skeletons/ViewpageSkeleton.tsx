export const viewpageSkeleton = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[320px] bg-[#F4F4F5] flex justify-center items-center">
        <div className="w-full h-full bg-cover bg-no-repeat relative">
          <div className="flex absolute right-10 top-4">
            <label
              className={`w-[150px] h-[40px] bg-[#F4F4F5] text-[#18181B] rounded-md flex justify-center items-center gap-2 bg-cover bg-center`}
            ></label>
          </div>

          <div className="w-[100%] h-[100%] bg-[#18181B] text-[#FAFAFA] rounded-md flex justify-center items-center gap-2 bg-cover bg-center"></div>
        </div>
      </div>
      <div className="w-full flex justify-center gap-6 -my-20 relative">
        <div className="w-[45%] h-[50rem] bg-[#ffffff] rounded-md">
          <div className=" gap-3 border rounded-md p-4">
            <div className="flex justify-between border-b-[1px] pb-6 mt-4">
              <div className="flex items-center gap-2 ml-4">
                <img className="w-8 h-8 rounded-full" alt="Jake" />
                <p className="font-bold text-lg"></p>
              </div>
            </div>
            <div className="mt-10 ml-4">
              <p className="text-md text-[#18181B] font-semibold"></p>
              <p className="w-full my-8 text-sm"></p>
            </div>
          </div>
          <div className="gap-3 border rounded-md mt-4 p-4">
            <p className="text-md font-semibold p-2 mt-2 ml-2"></p>
            <input className="w-full my-4 ml-2 p-2 text-sm outline-none" />
          </div>

          <div className="max-h-[20rem] gap-6 border rounded-md mt-4 overflow-y-auto custom-scrollbar relative">
            <h1 className="text-md font-semibold p-6 ml-2 sticky top-0 bg-white"></h1>
            <div className="w-full min-h-[10rem] border rounded-md mt-6 flex flex-col items-center justify-center">
              <p className="mt-2 text-md"></p>
            </div>
            <div className="w-full p-2 gap-2"></div>
            className="w-full mb-4 sticky bg-[#FAFAFA] text-[#18181B] text-sm
            p-6"
          </div>
        </div>
        <div className="w-[40%] h-[60%] p-6 bg-[#ffffff] border rounded-md">
          <div className="mb-4">
            <p className="text-lg font-bold mt-2"></p>
            <p className="text-[#09090B] text-md mt-5"></p>
            <div className="w-[100%] text-bold flex gap-4 mt-2"></div>
          </div>
          <div className="mb-6">
            <p className="text-[#09090B] text-md mt-10"></p>
            <input
              placeholder="bymecoffee@gmail.com"
              type="url"
              name="socialURLOrBuyMeACoffee"
              className="border rounded-md w-full p-2 mt-1 text-sm outline-none"
            />

            <div className="text-md flex items-center gap-1 pt-2"></div>
          </div>
          <div className="mb-10">
            <p className="text-md"></p>
            <textarea
              className="w-full border rounded-md px-4 py-2 mt-2 outline-none text-sm"
              placeholder="Please write your message here"
            />
          </div>

          <div className="flex">
            <button className="w-full p-2 rounded-md text-sm  "></button>
          </div>
        </div>
      </div>
    </div>
  );
};
