import { FiExternalLink, FiVideo } from "react-icons/fi";
import { LuCopy } from "react-icons/lu";
export default function UserProfile() {
  return (
    <div>
      <div className="max-w-[909px] mx-auto mt-16 p-5 max-h-56 border border-solid rounded-lg ">
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <img src="Avatar-Image.png" />
            <h4 className="font-semibold">Baaska</h4>
          </div>
          <button className="flex max-h-10 items-center gap-3 p-4 bg-[#f4f4f5] rounded-md">
            View profile <FiExternalLink />
          </button>
        </div>
        <div className="flex pt-5 gap-5">
          <div>
            <h4 className="font-bold pr-6 ">About Baaska</h4>
            <p className="max-w-[420px] pt-4">
              End minii tuhai ym bichih bogood bag hamt olondoo bayrlalaa gej
              helyee manai bagiinhan uneheer sain baigaa shuu
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Social Media URL</h4>
            <p className="pt-4">
              https://monkhtsolmons-organization.gitbook.io/monkhtsolmons-organization/folder-structure
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[909px] mx-auto mt-16 p-5 max-h-56 border border-solid rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="Avatar-Image.png" />
            <div>
              <h4 className="font-semibold">Baaska</h4>
              <a
                className="text-sm"
                href="https://www.youtube.com/watch?v=173a5Hc2a80"
              >
                https://www.youtube.com/watch?v=173a5Hc2a80
              </a>
            </div>
          </div>
          <button className="flex max-h-10 items-center text-white gap-3 p-4 bg-[#18181B] rounded-md">
            <LuCopy /> Share Page link
          </button>
        </div>
        <div className="max-w-[859px] mx-auto border border-solid bg-[#E4E4E7] mt-6"></div>
      </div>
    </div>
  );
}
