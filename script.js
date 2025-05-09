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

document.addEventListener("DOMContentLoaded", () => {
  const domainButtons = document.querySelectorAll(".domain-button");
  const formationBlocks = document.querySelectorAll(".formation-block");

  domainButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedDomain = button.getAttribute("data-domain");

      // Hide all formation blocks
      formationBlocks.forEach((block) => {
        block.classList.remove("active");
      });

      // Show only the blocks matching the selected domain
      document
        .querySelectorAll(`.formation-block[data-domain="${selectedDomain}"]`)
        .forEach((block) => {
          block.classList.add("active");
        });
    });
  });

  const categoryButtons = document.querySelectorAll(".category-button");
  const formationItems = document.querySelectorAll(".formation-item");
  const searchInput = document.querySelector(".search-input");

  // Category filtering
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      button.classList.add("active");

      // Show all formations if "All" is clicked
      if (category === "all") {
        formationItems.forEach((item) => {
          item.style.display = "block";
        });
      } else {
        // Show only formations matching the selected category
        formationItems.forEach((item) => {
          if (item.getAttribute("data-category") === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    formationItems.forEach((item) => {
      const title = item.querySelector("h3").textContent.toLowerCase();

      // Show or hide formations based on the search input
      if (title.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.querySelector(".menu-button");

  toggleButton.addEventListener("click", () => {
    // Toggle the "hidden" class on the sidebar
    sidebar.classList.toggle("hidden");
  });
});