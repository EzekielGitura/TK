const phoneNumber = "254119331991";
const baseMessage = "Hello T, I would like to book an errand with TK On The Go.";

function whatsappUrl(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = link.dataset.service
    ? `Hello T, I need help with ${link.dataset.service.toLowerCase()}.`
    : baseMessage;
  link.href = whatsappUrl(message);
});

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("site-navigation");

if (header && menuToggle && navigation) {
  menuToggle.hidden = false;
  navigation.dataset.enhanced = "true";

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.title = "Open menu";
    navigation.classList.remove("is-open");
  }

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.title = open ? "Close menu" : "Open menu";
    navigation.classList.toggle("is-open", open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  const desktopLayout = window.matchMedia("(min-width: 901px)");
  if (desktopLayout.addEventListener) {
    desktopLayout.addEventListener("change", closeMenu);
  } else {
    desktopLayout.addListener(closeMenu);
  }

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
