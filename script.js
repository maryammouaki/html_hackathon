const menuButtons = document.querySelectorAll(".menu-button");
const screenOverlay = document.querySelector(".main-layout .screen-overlay");
const searchButton = document.querySelector("#search-button");
const searchBackButton = document.querySelector("#search-back-button");

// Toggle sidebar visibility when menu buttons are clicked
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
  });
});

// Toggle sidebar visibility when screen overlay is clicked
screenOverlay.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-hidden");
});

// Show sidebar on large screens by default
if (window.innerWidth >= 768) {
  document.body.classList.remove("sidebar-hidden");
}

// Toggle search bar on click on mobile
const toggleSearchBar = () => {
  document.body.classList.toggle("show-mobile-search");
};

searchButton.addEventListener("click", toggleSearchBar);
searchBackButton.addEventListener("click", () => searchButton.click());
