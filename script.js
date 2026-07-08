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
