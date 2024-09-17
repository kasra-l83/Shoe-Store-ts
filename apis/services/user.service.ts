import { httpClient } from "../client";
import { urls } from "../urls";

interface userInfo {
    id: string;
    username: string;
}

export async function getUserInfo(): Promise<userInfo> {
    const response = await httpClient().get(urls.user);
    return response.data as userInfo;
}