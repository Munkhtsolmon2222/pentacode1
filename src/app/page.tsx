import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import EditProfileDialogue from "./components/profile/EditProfileDialogue";

export default function Home() {
  return (
    <div>
      <CreateProfile />
      <div className="h-8 w-10"></div>
      <EditProfileDialogue />
      <div className="h-8 w-10"></div>
      <EditProfile />
    </div>
  );
}
