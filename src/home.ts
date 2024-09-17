import { getUserInfo } from "../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";
import { getSessionToken } from "../libs/session-manager";

interface UserInfo {
  username: string;
}

interface Sneaker {
  id: string;
  name: string;
  price: number;
  imageURL: string;
}

interface SneakerData {
  data: Sneaker[];
  totalPages: number;
}

const userName = document.getElementById("username") as HTMLElement;
const sneakerDataContainer = document.getElementById("sneaker-data") as HTMLElement;
const paginationContainer = document.getElementById("pagination") as HTMLElement;
const token = getSessionToken() as string;

async function main(): Promise<void> {
  try {
    const response: UserInfo = await getUserInfo();
    userName.innerText = response.username;
  } catch (error) {
    errorHandler(error);
  }
}

main();

function greeting(): string {
  const now = new Date();
  const hours = now.getHours();
  let message: string;
  
  if (hours >= 6 && hours < 11) {
    message = "Good Morning";
  } else if (hours >= 11 && hours < 16) {
    message = "Good Afternoon";
  } else if (hours >= 16 && hours < 21) {
    message = "Good Evening";
  } else {
    message = "Good Night";
  }
  
  return message;
}

document.getElementById("greeting")!.textContent = greeting() + " 👋";

document.getElementById("logout")?.addEventListener("click", () => {
  localStorage.removeItem(token);
  window.location.href = "/login";
});

const xhttp = new XMLHttpRequest();

function renderList(pages: number): void {
  sneakerDataContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  xhttp.onreadystatechange = function (): void {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const sneakerData: SneakerData = JSON.parse(this.responseText);
        
        sneakerData.data.forEach(sneaker => {
          const div = document.createElement("div");
          div.style.width = "90%";
          div.innerHTML = `
            <img src='${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class="truncate" id="title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `;
          sneakerDataContainer.appendChild(div);

          div.addEventListener("click", () => {
            localStorage.setItem("product-id", sneaker.id);
            window.location.href = "/product";
          });
        });

        for (let i = 1; i <= sneakerData.totalPages; i++) {
          const button = document.createElement("button");
          button.style.border = "solid 1px black";
          button.style.width = "40px";
          button.style.height = "40px";
          button.style.borderRadius = "50%";
          button.style.marginRight = "10px";
          button.innerText = i.toString();
          paginationContainer.appendChild(button);

          button.addEventListener("click", () => {
            renderList(i);
          });
        }
      } else {
        errorHandler(new Error("Failed to fetch sneaker data"));
      }
    }
  };

  xhttp.open("GET", `http://localhost:3000/sneaker?page=${pages}&limit=10`, true);
  xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
  xhttp.send();
}

renderList(1);

const brandButtons = document.querySelectorAll(".brand-button") as NodeListOf<HTMLButtonElement>;
let selectedButton = brandButtons[0];
selectedButton.classList.add("selected");

brandButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (selectedButton) {
      selectedButton.classList.remove("selected");
    }
    button.classList.add("selected");
    selectedButton = button;
  });
});

function brands(pages: number, brand: string): void {
  sneakerDataContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  xhttp.onreadystatechange = function (): void {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const sneakerData: SneakerData = JSON.parse(this.responseText);
        
        sneakerData.data.forEach(sneaker => {
          const div = document.createElement("div");
          div.style.width = "90%";
          div.id = `${sneaker.id}`;
          div.innerHTML = `
            <img src='${sneaker.imageURL}' class="rounded-3xl size-[182px]">
            <h2 class="truncate" id="title">${sneaker.name}</h2>
            <h4>$ ${sneaker.price}.00</h4>
          `;
          sneakerDataContainer.appendChild(div);

          div.addEventListener("click", () => {
            localStorage.setItem("product-id", sneaker.id);
            console.log(sneaker.id);
            window.location.href = "/product";
          });
        });

        for (let i = 1; i <= sneakerData.totalPages; i++) {
          const button = document.createElement("button");
          button.style.border = "solid 1px black";
          button.style.width = "40px";
          button.style.height = "40px";
          button.style.borderRadius = "50%";
          button.style.marginRight = "10px";
          button.innerText = i.toString();
          paginationContainer.appendChild(button);

          button.addEventListener("click", () => {
            brands(i, brand);
          });
        }
      } else {
        errorHandler(new Error("Failed to fetch brand data"));
      }
    }
  };

  xhttp.open("GET", `http://localhost:3000/sneaker?page=${pages}&limit=10&brands=${brand}`, true);
  xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
  xhttp.send();
}

document.getElementById("all")?.addEventListener("click", () => {
  sneakerDataContainer.innerHTML = "";
  renderList(1);
});

document.getElementById("nike")?.addEventListener("click", () => {
  brands(1, "NIKE");
});

document.getElementById("addidas")?.addEventListener("click", () => {
  brands(1, "ADDIDAS");
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.width = "100%";
  div.style.marginLeft = "40%";
  div.style.paddingTop = "100px";
  div.innerHTML = `
    <img src="img/empty.png" class="mb-3">
    <h2 class="text-xl font-black mb-3">Not Found</h2>
    <p class=" text-center">Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</p>
  `;
  sneakerDataContainer.appendChild(div);
});

document.getElementById("puma")?.addEventListener("click", () => {
  brands(1, "PUMA");
});

document.getElementById("asics")?.addEventListener("click", () => {
  brands(1, "ASICS");
});

document.getElementById("reebok")?.addEventListener("click", () => {
  brands(1, "REEBOK");
});

document.getElementById("new-balance")?.addEventListener("click", () => {
  brands(1, "NEW BALANCE");
});

document.getElementById("converse")?.addEventListener("click", () => {
  brands(1, "CONVERSE");
});