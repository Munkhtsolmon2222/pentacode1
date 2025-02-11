import { LuCopy } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function UserProfile() {
  return (
    <div className="w-[80%] fixed right-0 top-0 h-full bg-gray-primary text-black p-4">
      <div className="max-w-[909px] mx-auto mt-16 p-5 border border-solid rounded-lg">
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
            <LuCopy /> Share page link
          </button>
        </div>
        <div className="max-w-[859px] mx-auto border border-solid bg-[#E4E4E7] mt-6"></div>
        <div className="flex items-center gap-4 pt-7">
          <h4 className="font-bold text-2xl">Earning</h4>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue className="text-lg" placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-4xl size-9 pt-6 pb-10 ">$450</p>
      </div>
    </div>
  );
}
