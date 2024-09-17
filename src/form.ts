import './style.css'
const Password = document.getElementById("password") as HTMLInputElement;
const unhide = document.getElementById("unhide") as HTMLElement;
const hide = document.getElementById("hide") as HTMLElement;

unhide.style.display = "block";
hide.style.display = "none";

function togglePass(): void {
    if (Password.type === "password") {
        Password.type = "text";
        unhide.setAttribute("hidden", "true");
        hide.removeAttribute("hidden");
        unhide.style.display = "none";
        hide.style.display = "block";
    } else {
        Password.type = "password";
        unhide.removeAttribute("hidden");
        hide.setAttribute("hidden", "true");
        unhide.style.display = "block";
        hide.style.display = "none";
    }
}

const form = document.querySelector(".form") as HTMLFormElement;
const inputs = form.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
const Submit = document.getElementById("submit") as HTMLButtonElement;

function check(): void {
    let fill = true;
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            fill = false;
        }
    });
    Submit.disabled = !fill;
}

check();

inputs.forEach(input => {
    input.addEventListener("input", check);
});

unhide.addEventListener("click", () =>{
    togglePass()
})
hide.addEventListener("click", () =>{
    togglePass()
})