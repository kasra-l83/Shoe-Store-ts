import Toastify from "toastify-js";

type ToastMode = "success" | "error";

export const toast = (text: string, mode: ToastMode = "error"): void => {
    Toastify({
        text,
        duration: 3000,
        close: true,
        style: {
            background: mode === "success" ? "green" : "red",
            fontSize: "18px",
            fontWeight: "600",
            borderRadius: "10px"
        }
    }).showToast();
};