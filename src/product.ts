import { getSessionToken } from "../libs/session-manager";

const id: string | null = localStorage.getItem("product-id");
const token: string | null = getSessionToken();
const productContainer = document.getElementById("product") as HTMLElement;

if (productContainer && id && token) {
  function renderList(id: string): void {
    productContainer.innerHTML = "";
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          interface ProductData {
            imageURL: string;
            name: string;
            colors: string;
            sizes: string;
            price: number;
          }

          const productData: ProductData = JSON.parse(this.responseText);

          const colors: string[] = productData.colors.split("|");
          const sizes: string[] = productData.sizes.split("|");

          productContainer.innerHTML = `
            <img src='${productData.imageURL}' class="w-full">
            <h1 class="font-bold text-[35px] mt-5 mb-3 truncate w-[85%]">${productData.name}</h1>
            <i style="font-size:30px" class="fa absolute right-6 mt-[-52px]">&#xf08a;</i>
            <span class="flex justify-around mb-3 w-[80%]">
              <h6 class="bg-gray-300 inline px-1 rounded-md">5,371 sold<h6>
              <i style="font-size:20px" class="fa mt-1">&#xf123;</i>
              <h6 class="mt-1">4.3 (5,389 reviews)</h6>
            </span>
            <div class="py-3 border-y-2">
              <h4 class="font-semibold text-[25px]">Description</h4>
              <p class="line-clamp-2 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
              <div>
                <div class="flex justify-between w-[60%] mb-5">
                  <h3 class="font-semibold text-[25px]">Size</h3>
                  <h3 class="font-semibold text-[25px]">Color</h3>
                </div>
                <div class="flex justify-between">
                  <div id="size-list" class="flex"></div>
                  <div id="color-list" class="flex justify-between overflow-x-auto snap-x"></div>
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-x-9 absolute top-[850px]">
              <div>
                <p class="text-gray-500">Total price</p>
                <h3 id="price" class="text-3xl font-semibold mt-1 w-[103px]">$${productData.price}.00</h3>
              </div>
              <div>
                <i style="font-size:16px" class="fa text-white absolute left-40 top-5">&#xf290;</i>
                <button class="text-lg bg-black text-white px-11 py-4 rounded-full">Add to Cart</button>
              </div>
            </div>
          `;

          const sizeList = document.getElementById("size-list") as HTMLElement | null;
          if (sizeList) {
            sizes.forEach(size => {
              const button = document.createElement("button");
              button.classList.add("size-button");
              button.textContent = size;
              button.style.border = "solid 1px black";
              button.style.width = "40px";
              button.style.height = "40px";
              button.style.borderRadius = "50%";
              button.style.marginRight = "5px";
              sizeList.appendChild(button);
            });

            const sizeButtons = document.querySelectorAll(".size-button") as NodeListOf<HTMLButtonElement>;
            let selectedSizeButton: HTMLButtonElement | null = null;

            sizeButtons.forEach(button => {
              button.addEventListener("click", () => {
                if (selectedSizeButton) {
                  selectedSizeButton.classList.remove("selected");
                }
                button.classList.add("selected");
                selectedSizeButton = button;
              });
            });
          }

          const colorList = document.getElementById("color-list") as HTMLElement | null;
          if (colorList) {
            colors.forEach(color => {
              const button = document.createElement("button");
              button.classList.add("color-button");
              button.innerHTML = `<i class="material-icons text-white hidden">&#xe5ca;</i>`;
              button.style.border = "solid 1px black";
              button.style.width = "40px";
              button.style.height = "40px";
              button.style.borderRadius = "50%";
              button.style.backgroundColor = color;
              button.style.marginRight = "5px";
              colorList.appendChild(button);
            });

            const colorButtons = document.querySelectorAll(".color-button") as NodeListOf<HTMLButtonElement>;
            let selectedColorButton: HTMLButtonElement | null = null;

            colorButtons.forEach(button => {
              button.addEventListener("click", () => {
                if (selectedColorButton) {
                  selectedColorButton.classList.remove("selected");
                }
                button.classList.add("selected");
                selectedColorButton = button;
              });
            });
          }

          const priceElement = document.getElementById("price") as HTMLElement | null;
          let priceValue = productData.price;
          let count = 1;

          document.getElementById("add")?.addEventListener("click", () => {
            count++;
            if (priceElement) {
              priceElement.innerText = `$${count * priceValue}.00`;
            }
          });

          document.getElementById("remove")?.addEventListener("click", () => {
            if (count > 1) {
              count--;
              if (priceElement) {
                priceElement.innerText = `$${count * priceValue}.00`;
              }
            }
          });
        } else {
          console.error("error", this.status, this.statusText);
        }
      }
    };

    xhttp.open("GET", `http://localhost:3000/sneaker/item/${id}`, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
    xhttp.send();
  }

  renderList(id);
} else {
  console.error("Error: Product container or product ID/token is missing.");
}