const phoneNumber = "254742321784";
const baseMessage = "Hello T, I need help with an errand.";

function whatsappUrl(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function setDirectLinks() {
  const links = [
    document.getElementById("nav-whatsapp"),
    document.getElementById("hero-whatsapp"),
    document.getElementById("contact-whatsapp"),
    document.getElementById("footer-whatsapp")
  ];

  links.forEach((link) => {
    if (link) {
      link.href = whatsappUrl(baseMessage);
    }
  });
}

function setSelectedQuickButton(selectedButton) {
  document.querySelectorAll("[data-service]").forEach((button) => {
    button.classList.toggle("is-selected", button === selectedButton);
  });
}

function buildRequestMessage(form) {
  const formData = new FormData(form);
  const service = formData.get("service");
  const location = formData.get("location");
  const timing = formData.get("timing");
  const details = formData.get("details");

  return [
    baseMessage,
    "",
    `Service: ${service}`,
    `Pickup or delivery point: ${location}`,
    `Timing: ${timing}`,
    `Details: ${details}`,
    "",
    "Please let me know your availability and quote."
  ].join("\n");
}

function initBookingForm() {
  const form = document.getElementById("booking");
  const serviceSelect = document.getElementById("service");
  const detailsField = document.getElementById("details");
  const status = document.getElementById("form-status");

  if (!form || !serviceSelect || !detailsField) {
    return;
  }

  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      serviceSelect.value = button.dataset.service;
      setSelectedQuickButton(button);
      detailsField.focus();
    });
  });

  serviceSelect.addEventListener("change", () => {
    const matchingButton = Array.from(document.querySelectorAll("[data-service]"))
      .find((button) => button.dataset.service === serviceSelect.value);
    setSelectedQuickButton(matchingButton);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    if (status) {
      status.textContent = "Opening WhatsApp with your request.";
    }

    window.open(whatsappUrl(buildRequestMessage(form)), "_blank", "noopener");
  });
}

setDirectLinks();
initBookingForm();

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav() {
  const current = sections
    .map((section) => ({
      section,
      distance: Math.abs(section.getBoundingClientRect().top - 100)
    }))
    .sort((a, b) => a.distance - b.distance)[0]?.section;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();
