import { Login } from "@/app/_component/authComponent/LogIn";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex justify-items-center items-center">
      <div className="w-[50%] h-screen bg-amber-400 flex flex-col justify-center items-center">
        <img
          src="/assets/Logo-coffee.svg"
          alt="Login"
          className="rounded-xl mt-[50px] ml-[40px] w-[140px] h-auto"
        />
        <div className="flex justify-center items-center h-screen">
          <img
            src="/assets/Illustration.svg"
            alt="Login"
            className="rounded-xl w-[240px] h-auto mb-8"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center px-4 mt-4 space-y-3">
          <p className="text-lg font-bold">Fund your creative work</p>
          <p className="text-gray-700 mt-2">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>

      <div className="w-[50%]">
        <Button variant="secondary">Sign up</Button>
        <Login />
      </div>
    </div>
  );
}
