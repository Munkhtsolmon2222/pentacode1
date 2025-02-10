import Link from "next/link";
import { LuCoffee } from "react-icons/lu";
export default function Header() {
  return (
    <div>
      <div className="py-4 flex justify-between w-[90%] mx-auto">
        <div className="flex gap-2 items-center font-bold">
          <Link href="/">
            <div className="flex gap-2 items-center font-bold h-10">
              <LuCoffee className="text-2xl" />
              Buy Me Coffee
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <img src="Avatar-Image.png" />
          <h4>Baaska</h4>
        </div>
      </div>
    </div>
  );
}
