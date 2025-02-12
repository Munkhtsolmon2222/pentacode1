import EditBankCard from "../_components/bank/EditBankCard";
import EditProfile from "../_components/profile/EditProfile";

export default function AccountSettings() {
	return (
		<div className="pb-28">
			<h3 className="font-bold ">My account</h3>
			<EditProfile />
			<div className="max-w-lg mx-auto border border-[#E4E4E7] rounded-lg mt-8">
				<p className="p-6 font-bold"> Set a new password</p>
				<div className="px-6">
					<p className="">New Password</p>
					<input
						type="text"
						placeholder="New password"
						className="py-[10px] pl-3 mt-2 border rounded-md w-full "
					/>
					<p className="pt-3">Confirm Password</p>
					<input
						type="text"
						placeholder="Confirm Password"
						className="py-[10px] pl-3 mt-2 border rounded-md w-full"
					/>
				</div>
				<div className="p-6">
					<button className="w-full p-2 bg-black text-white rounded-md">
						Save changes
					</button>
				</div>
			</div>
			<EditBankCard />
			<div className="p-4 mt-8 max-w-lg rounded-lg border-[#E4E4E7] border mx-auto">
				<p className="text-lg font-bold">Success page</p>
				<div className="mt-4">
					<label className="font-medium">Confirmation message</label>
					<textarea
						name="about"
						placeholder="Thank you for supporting me! It means a lot to have your support. It’s a step toward creating a more inclusive and accepting community of artists."
						className={`border rounded-md w-full p-2 mt-1`}
					/>
				</div>

				<button className="mt-6 w-full p-2 bg-black text-white rounded-md">
					Save changes
				</button>
			</div>
		</div>
	);
}
