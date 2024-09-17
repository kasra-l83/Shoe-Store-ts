import { toast } from "./toast";
import { removeSessionToken } from "./session-manager";

interface ErrorResponse {
    response?: {
        data?: {
            message?: string | string[];
            statusCode?: number;
        };
    };
}

export const errorHandler = (error: ErrorResponse): void => {
    const message = error.response?.data?.message;

    if (typeof message === "string") {
        toast(message);
    } else if (Array.isArray(message)) {
        for (const msgText of message) {
            toast(msgText);
        }
    }

    const statusCode = Number(error.response?.data?.statusCode || 0);
    if (statusCode === 403) {
        toast("Please login again");
        removeSessionToken();
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    }
};