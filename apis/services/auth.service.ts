import { httpClient } from "../client";
import { urls } from "../urls";

interface authData {
    username: string;
    password: string;
}

export async function login(data: authData): Promise<any> {
    const response = await httpClient().post(urls.auth.login, data);
    return response.data;
}

export async function signup(data: authData): Promise<any> {
    const response = await httpClient().post(urls.auth.signup, data);
    return response.data;
}