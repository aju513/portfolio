window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
});

// Submenu toggle function
function toggleSubmenu() {
  const submenu = document.getElementById("servicesSubmenu");
  const arrow = document.getElementById("servicesArrow");

  submenu.classList.toggle("submenu-open");
  arrow.classList.toggle("rotate-180");
}

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnMenuButton = mobileMenuBtn.contains(event.target);

  if (
    !isClickInsideMenu &&
    !isClickOnMenuButton &&
    mobileMenu.classList.contains("menu-open")
  ) {
    mobileMenu.classList.remove("menu-open");
  }
});
