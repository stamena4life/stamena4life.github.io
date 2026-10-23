const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

const mailForm = document.querySelector("[data-mail-form]");

if (mailForm) {
  mailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(mailForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message
    ].join("\n");
    const href = `mailto:stamena4life@gmail.com?subject=${encodeURIComponent("Stamena4Life Inquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  });
}

const subscriptionPopup = document.querySelector("[data-subscription-popup]");

if (subscriptionPopup) {
  const storageKey = "stamena4life-subscription-popup-seen-v5";
  const previewPopup = window.location.hash === "#preview-subscribe";
  const closeButtons = subscriptionPopup.querySelectorAll("[data-subscription-close]");
  const subscribeLink = subscriptionPopup.querySelector("[data-subscription-accept]");
  const closeButton = subscriptionPopup.querySelector(".subscription-popup-close");
  let popupSeen = false;

  try {
    popupSeen = window.localStorage.getItem(storageKey) === "true";
  } catch {
    popupSeen = false;
  }

  const rememberPopup = () => {
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch {
      // The popup still works when browser storage is unavailable.
    }
  };

  const closePopup = () => {
    subscriptionPopup.hidden = true;
    document.body.classList.remove("subscription-popup-open");
  };

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  if (subscribeLink) {
    subscribeLink.addEventListener("click", closePopup);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !subscriptionPopup.hidden) {
      closePopup();
    }
  });

  if (!popupSeen || previewPopup) {
    window.setTimeout(() => {
      subscriptionPopup.hidden = false;
      document.body.classList.add("subscription-popup-open");
      if (!previewPopup) {
        rememberPopup();
      }
      closeButton?.focus();
    }, 1200);
  }
}
