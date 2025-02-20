export function HomeSkeleton() {
  return (
    <div className="w-[80%] h-[120px] my-auto p-5 overflow-y-auto custom-scrollbar mx-auto mt-4 bg-gray-100 animate-pulse rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div>
            <div className="w-36 h-4 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-[200px] h-4 bg-gray-300 animate-pulse mt-2 rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="w-36 h-4 mt-2 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div className="w-[400px] h-4 bg-gray-300 animate-pulse mt-4 rounded-md"></div>
    </div>
  );
}
