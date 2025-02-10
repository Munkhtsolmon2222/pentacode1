import { use } from "react";
// import { useAuth } from "../_components/context/AuthContext";
import UserProfile from "../_components/UserProfile";

export default function Home() {
  //   const { userId } = useAuth();
  return (
    <div>
      <UserProfile />
      {/* {userId} */}
    </div>
  );
}
