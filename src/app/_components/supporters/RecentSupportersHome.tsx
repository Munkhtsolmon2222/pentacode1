"use client";
import { Creator, Transaction, User } from "@/app/constants/type";
import { useEffect, useState } from "react";

export default function RecentSupport({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [userData, setUserData] = useState<User>();
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/donation/received/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const resJson = await res.json();
      setUserData(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(userData);

  return (
    <div className="w-full  mt-4 p-5">
      <div className="w-6 h-6 rounded-full flex gap-2 items-center">
        <img src={transaction?.avatarImage} />
        <div>
          <h1>{transaction?.name}</h1>
          <h3> {transaction?.socialMediaURL}</h3>
        </div>
      </div>
      <div>
        <h3>{transaction?.amount}</h3>
        <h4 className="text-[#71717A] text-xs">{transaction?.updatedAt}</h4>
      </div>
      <p className="pt-4 pl-9">{transaction?.about}</p>
    </div>
  );
}
// "use client";
// import { Transaction } from "@/app/constants/type";

// export default function RecentSupport({
//   transaction,
// }: {
//   transaction: Transaction;
// }) {
//   return (
//     <div className="w-auto bg-gray-100 text-black p-4 border-b border-gray-300">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           {transaction?.avatarImage ? (
//             <img
//               src={transaction.avatarImage}
//               alt="Avatar"
//               className="w-10 h-10 rounded-full"
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//           )}
//           <div>
//             <h1 className="font-semibold">
//               {transaction?.name || "Нэргүй хэрэглэгч"}
//             </h1>
//             <a
//               href={transaction?.socialMediaURL || "#"}
//               target="_blank"
//               className="text-blue-500 text-sm"
//             >
//               {transaction?.socialMediaURL ? "Нийгмийн сүлжээ" : "URL байхгүй"}
//             </a>
//           </div>
//         </div>
//         <div className="text-right">
//           <h3 className="text-lg font-semibold">{transaction?.amount}₮</h3>
//           <h4 className="text-gray-500 text-xs">{transaction?.updatedAt}</h4>
//         </div>
//       </div>
//       {transaction?.about && (
//         <p className="pt-2 text-gray-700">{transaction.about}</p>
//       )}
//     </div>
//   );
// }
