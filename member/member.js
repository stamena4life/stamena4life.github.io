const memberConfig = {
  apiBase: "",
  subscribeUrl: "",
  ...(window.S4L_MEMBER_CONFIG || {})
};

const tokenKey = "s4l_member_token";
const emailKey = "s4l_member_email";
const statusEl = document.querySelector("[data-member-status]");
const requestForm = document.querySelector("[data-code-request-form]");
const verifyForm = document.querySelector("[data-code-verify-form]");
const signOutButton = document.querySelector("[data-member-signout]");
const downloadButtons = [...document.querySelectorAll("[data-resource-download]")];
const subscribeLinks = [...document.querySelectorAll("[data-subscribe-link]")];

let pendingEmail = localStorage.getItem(emailKey) || "";

const apiBase = String(memberConfig.apiBase || "").replace(/\/$/, "");
const apiConfigured = apiBase && !apiBase.includes("YOUR-CLOUDFLARE-SUBDOMAIN");

function setStatus(message, tone = "default") {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

function setSignedInState(isSignedIn) {
  downloadButtons.forEach((button) => {
    button.disabled = !isSignedIn;
    button.textContent = isSignedIn ? "Download PDF" : "Unlock Download";
  });

  if (requestForm) requestForm.classList.toggle("is-hidden", isSignedIn);
  if (verifyForm) verifyForm.classList.toggle("is-hidden", isSignedIn || !pendingEmail);
  if (signOutButton) signOutButton.classList.toggle("is-hidden", !isSignedIn);
}

function authHeaders() {
  const token = localStorage.getItem(tokenKey);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, options = {}) {
  if (!apiConfigured) {
    throw new Error("Member login is not connected yet. Please email Stamena4Life for subscriber access.");
  }

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Something went wrong. Please try again.");
  }

  return payload;
}

async function checkSession() {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    setSignedInState(false);
    return;
  }

  try {
    const payload = await apiFetch("/me", {
      method: "GET",
      headers: authHeaders()
    });
    setStatus(`Signed in as ${payload.email}.`, "success");
    setSignedInState(true);
  } catch (error) {
    localStorage.removeItem(tokenKey);
    setStatus(error.message, "warning");
    setSignedInState(false);
  }
}

subscribeLinks.forEach((link) => {
  if (memberConfig.subscribeUrl) {
    link.href = memberConfig.subscribeUrl;
  }
});

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    pendingEmail = String(formData.get("email") || "").trim().toLowerCase();

    if (!pendingEmail) {
      setStatus("Enter the email connected to your subscription.", "warning");
      return;
    }

    try {
      const payload = await apiFetch("/auth/request-code", {
        method: "POST",
        body: JSON.stringify({ email: pendingEmail })
      });
      localStorage.setItem(emailKey, pendingEmail);
      setStatus(payload.message || "Check your email for a login code.", "success");
      if (payload.devCode) {
        setStatus(`Development login code: ${payload.devCode}`, "warning");
      }
      setSignedInState(false);
      verifyForm?.classList.remove("is-hidden");
      verifyForm?.querySelector("input")?.focus();
    } catch (error) {
      setStatus(error.message, "warning");
    }
  });
}

if (verifyForm) {
  verifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(verifyForm);
    const code = String(formData.get("code") || "").trim();

    try {
      const payload = await apiFetch("/auth/verify-code", {
        method: "POST",
        body: JSON.stringify({ email: pendingEmail, code })
      });
      localStorage.setItem(tokenKey, payload.token);
      localStorage.setItem(emailKey, payload.email);
      setStatus(`Signed in as ${payload.email}.`, "success");
      setSignedInState(true);
    } catch (error) {
      setStatus(error.message, "warning");
    }
  });
}

if (signOutButton) {
  signOutButton.addEventListener("click", () => {
    localStorage.removeItem(tokenKey);
    setStatus("Signed out.", "default");
    setSignedInState(false);
  });
}

downloadButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const resourceId = button.dataset.resourceDownload;
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      setStatus("Sign in to unlock subscriber downloads.", "warning");
      document.querySelector("#member-login")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      button.disabled = true;
      button.textContent = "Preparing...";
      const response = await fetch(`${apiBase}/download/${encodeURIComponent(resourceId)}`, {
        headers: authHeaders()
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || "Download failed. Please try again.");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const disposition = response.headers.get("content-disposition") || "";
      const filename = disposition.match(/filename="([^"]+)"/)?.[1] || `${resourceId}.pdf`;
      link.href = blobUrl;
      link.download = filename;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
      setStatus("Download ready.", "success");
    } catch (error) {
      setStatus(error.message, "warning");
    } finally {
      button.disabled = false;
      button.textContent = "Download PDF";
    }
  });
});

if (!apiConfigured) {
  setStatus("Subscriber login is being connected. Email Stamena4Life for access right now.", "warning");
}

checkSession();
