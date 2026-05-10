const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const mode = document.body.dataset.mode;

const mainBtn = document.querySelector(".main-btn");
const extraBtn = document.querySelector(".extra-btn");

if (mode === "takeaway") {
  mainBtn.innerText = "Order";
  extraBtn.innerText = "Menu";
}

if (mode === "barber") {
  mainBtn.innerText = "Book";
  extraBtn.innerText = "Services";
}

if (mode === "gym") {
  mainBtn.innerText = "Join";
  extraBtn.innerText = "Plans";
}