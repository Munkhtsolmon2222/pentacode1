export function Skeleton() {
  return (
    <div className="w-[80%] mx-auto mt-6 p-5 h-52 bg-gray-100 animate-pulse rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-24 h-5 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
        <div className="w-24 h-8 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div>
          <div className="w-36 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          <p className="w-full h-4 mt-2 bg-gray-300 animate-pulse rounded-md"></p>
        </div>
        <div>
          <div className="w-36 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="w-48 h-4 mt-2 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
