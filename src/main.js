import "./index.css";

// MARK: DOM Selection
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const yearEl = document.querySelector(".year");

formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from reloading
  console.log(inputEl.value);

  //  Empty the input field
  inputEl.value = "";
});

// IIFE
(function () {
  const year = new Date().getFullYear();

  // MARK: Update the DOM
  yearEl.textContent = `${year}`;
})();
