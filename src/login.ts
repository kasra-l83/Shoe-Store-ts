import { login } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { toast } from "../libs/toast";
import { setSessionToken } from "../libs/session-manager";

const loginForm = document.getElementById("login-form") as HTMLFormElement;

loginForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    console.log(form.elements);
    const usernameInput = form.elements[0] as HTMLInputElement;
    const passwordInput = form.elements[1] as HTMLInputElement;

    try {
        const response = await login({
            username: usernameInput.value,
            password: passwordInput.value
        });
        setSessionToken(response.token);
        toast("Logged in", "success");
        
        setTimeout(() => {
            window.location.href = "/home";
        }, 2000);
    } catch (error) {
        errorHandler(error);
    }
});