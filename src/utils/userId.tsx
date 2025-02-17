import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
	userId?: string;
};

export async function getUserId(): Promise<string | undefined> {
	let refreshToken: string | undefined;
	let decoded: DecodedToken | null = null;

	const accessToken = (await getCookie("accessToken")) as string | undefined;
	console.log(accessToken);
	if (!accessToken) {
		refreshToken = (await getCookie("refreshToken")) as string | undefined;

		if (refreshToken) {
			decoded = jwtDecode<DecodedToken>(refreshToken);
		}
	} else {
		decoded = jwtDecode<DecodedToken>(accessToken);
	}

	return decoded?.userId;
}
