import { LuCoffee } from "react-icons/lu";
export default function Header() {
  return (
    <div>
      <div className="pt-4 flex justify-between max-w-[1580px] mx-auto">
        <div className="flex gap-2 items-center font-bold">
          <LuCoffee className="text-2xl" />
          Buy Me Coffee
        </div>
        <div className="flex items-center gap-3">
          <img src="Avatar-Image.png" />
          <h4>Baaska</h4>
        </div>
      </div>
    </div>
  );
}
