import CreateProfile from "./_components/profile/EditProfile";
import EditProfile from "./_components/profile/EditProfile";
import EditProfileDialogue from "./_components/profile/EditProfileDialogue";

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
