import './style.css'
let currentIndex: number = 1;

function displaySlide(index: number): void {
  currentIndex = index;
  let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
  if (currentIndex > slides.length) {
    currentIndex = 1;
  }
  if (currentIndex < 1) {
    currentIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    (slides[i] as HTMLElement).style.display = "none";
  }
  (slides[currentIndex - 1] as HTMLElement).style.display = "block";
}

displaySlide(currentIndex);

function changeSlide(index: number): void {
  currentIndex += index;
  displaySlide(currentIndex);
}

const slideButtons: NodeListOf<Element> = document.querySelectorAll(".slide-button");
let selectedButton: Element = slideButtons[0];
(selectedButton as HTMLElement).classList.add("selected");

slideButtons.forEach((button: Element) => {
  button.addEventListener("click", () => {
    if (selectedButton) {
      (selectedButton as HTMLElement).classList.remove("selected");
    }
    (button as HTMLElement).classList.add("selected");
    selectedButton = button;
  });
});

document.getElementById("next1")?.addEventListener("click", () => {
  changeSlide(1);
  let selectedButton = slideButtons[1];
  (selectedButton as HTMLElement).classList.add("selected");

  slideButtons.forEach((button: Element) => {
    button.addEventListener("click", () => {
      if (selectedButton) {
        (selectedButton as HTMLElement).classList.remove("selected");
      }
      (button as HTMLElement).classList.add("selected");
      selectedButton = button;
    });
  });
});

document.getElementById("next2")?.addEventListener("click", () => {
  changeSlide(1);
  let selectedButton = slideButtons[2];
  (selectedButton as HTMLElement).classList.add("selected");

  slideButtons.forEach((button: Element) => {
    button.addEventListener("click", () => {
      if (selectedButton) {
        (selectedButton as HTMLElement).classList.remove("selected");
      }
      (button as HTMLElement).classList.add("selected");
      selectedButton = button;
    });
  });
});
document.getElementById("slide1")?.addEventListener("click", () =>{
  displaySlide(1);
})
document.getElementById("slide2")?.addEventListener("click", () =>{
  displaySlide(2);
})
document.getElementById("slide3")?.addEventListener("click", () =>{
  displaySlide(3);
})