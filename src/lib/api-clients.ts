import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { env } from "@/lib/env";
import { APIResponse } from "./service/APIResponse";

export const api = axios.create({
baseURL: env.SERVICE_URL,
timeout: 15000,
headers: {
"X-Service-Version": env.NEXT_PUBLIC_ALLOWED_SERVICE_VERSION,
}
});

/**
* A helper to wrap axios calls in your friend's APIResponse class
*/
export async function request<T>(config: AxiosRequestConfig): Promise<APIResponse<T>> {
try {
const response = await api(config);
return new APIResponse<T>().success("Success", response.data);
} catch (error: unknown) {
// Cast to AxiosError to safely access response data without 'any'
const axiosError = error as AxiosError<{ message?: string }>;
const message = axiosError.response?.data?.message || "Connection Failed";

return new APIResponse<T>().error(message);
}
}