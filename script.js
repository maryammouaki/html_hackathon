const menuButtons = document.querySelectorAll(".menu-button");
const screenOverlay = document.querySelector(".main-layout .screen-overlay");
const searchButton = document.querySelector("#search-button");
const searchBackButton = document.querySelector("#search-back-button");

document.addEventListener("DOMContentLoaded", function () {
  // Setup sidebar toggling
  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-hidden");
    });
  });

  // Close sidebar when clicking overlay
  if (screenOverlay) {
    screenOverlay.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-hidden");
    });
  }

  // Show sidebar on desktop automatically
  if (window.innerWidth >= 768) {
    document.body.classList.remove("sidebar-hidden");
  }

  // Setup search functionality
  const toggleSearchBar = () => {
    document.body.classList.toggle("show-mobile-search");
  };

  if (searchButton) {
    searchButton.addEventListener("click", toggleSearchBar);
  }

  if (searchBackButton) {
    searchBackButton.addEventListener("click", () => searchButton.click());
  }

  // Handle sidebar link navigation without disruption
  const sidebarLinks = document.querySelectorAll(".sidebar .link-item");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't handle navigation for current active page
      if (this.classList.contains("active")) {
        e.preventDefault();
        return;
      }

      // For mobile screens, close sidebar first, then navigate
      if (window.innerWidth < 768) {
        e.preventDefault();
        const href = this.getAttribute("href");

        // Close sidebar
        document.body.classList.add("sidebar-hidden");

        // Navigate after animation completes
        setTimeout(() => {
          window.location.href = href;
        }, 100); // Just slightly faster than CSS transition
      }
    });
  });

  // Activate current page in navigation
  activateCurrentPage();

  // Setup other page-specific functionality
  setupFormations();
  if (typeof setupPostInteractions === "function") {
    setupPostInteractions();
  }
});

function activateCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".link-section .link-item");
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });

  const categoryButtons = document.querySelectorAll(".category-button");
  if (currentPage === "index.html" && categoryButtons.length > 0) {
    categoryButtons[0].classList.add("active");
  }
}

function setupFormations() {
  const domainButtons = document.querySelectorAll(".domain-button");
  const formationBlocks = document.querySelectorAll(".formation-block");

  if (domainButtons.length > 0) {
    domainButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const domain = button.getAttribute("data-domain");

        domainButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        formationBlocks.forEach((block) => {
          if (block.getAttribute("data-domain") === domain) {
            block.classList.add("active");
          } else {
            block.classList.remove("active");
          }
        });
      });
    });

    if (domainButtons.length > 0) {
      domainButtons[0].click();
    }
  }

  const categoryButtons = document.querySelectorAll(".category-button");
  const formationItems = document.querySelectorAll(".formation-item");
  const searchInput = document.querySelector(".search-input");

  if (categoryButtons.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        formationItems.forEach((item) => {
          if (
            category === "all" ||
            item.getAttribute("data-category") === category
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();

      formationItems.forEach((item) => {
        const title = item.querySelector("h3")?.textContent.toLowerCase();

        if (title && title.includes(searchValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
}
