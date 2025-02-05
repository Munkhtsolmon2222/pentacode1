import { Login } from "@/app/components/auth/LogIn";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-[50%] h-screen bg-amber-400">
        <div className="flex justify-start items-start p-6 mx-6">
          <img
            src="/assets/Logo-coffee.svg"
            alt="Login"
            className="w-[140px] h-auto"
          />
        </div>
        <div className="mt-[180px]">
          <div className="flex justify-center items-center">
            <img
              src="/assets/Illustration.svg"
              alt="Login"
              className="rounded-xl w-[240px] h-auto mb-8"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-center space-y-2">
            <p className="text-lg font-bold">Fund your creative work</p>
            <p className="text-gray-700">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[50%]">
        <Login />
      </div>
    </div>
  );
}
