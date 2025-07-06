function showError(input, message) {
  input.classList.add("input-error");
  const msg = document.createElement("div");
  msg.className = "form-error";
  msg.textContent = message;
  input.insertAdjacentElement("afterend", msg);
}

function clearErrors(form) {
  form.querySelectorAll(".form-error").forEach((e) => e.remove());
  form
    .querySelectorAll(".input-error")
    .forEach((i) => i.classList.remove("input-error"));
}

/* -------------- LOGIN -------------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(loginForm);

    const [emailEl, passEl] = loginForm.querySelectorAll("input");
    let valid = true;

    const emailOK = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailEl.value);
    if (!emailOK) {
      showError(emailEl, "Enter a valid email");
      valid = false;
    }

    if (passEl.value.trim().length < 6) {
      showError(passEl, "Password must be at least 6 characters");
      valid = false;
    }

    if (valid) {
      alert("✅ Logged in (client‑side only)");
      // TODO: call backend or redirect
    }
  });
}

/* -------------- SIGN‑UP -------------- */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(signupForm);

    const [nameEl, emailEl, passEl] = signupForm.querySelectorAll("input");
    let valid = true;

    if (nameEl.value.trim() === "") {
      showError(nameEl, "Full name is required");
      valid = false;
    }

    const emailOK = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailEl.value);
    if (!emailOK) {
      showError(emailEl, "Enter a valid email");
      valid = false;
    }

    if (passEl.value.trim().length < 6) {
      showError(passEl, "Password must be at least 6 characters");
      valid = false;
    }

    if (valid) {
      alert("✅ Account created (client‑side only)");
      // TODO: call backend or redirect
    }
  });
}

/* -------------- tiny CSS injected for errors (optional) -------------- */
const style = document.createElement("style");
style.textContent = `
  .input-error { border-color: #e74c3c !important; }
  .form-error  { color: #e74c3c; font-size: 0.85rem; margin-top: -0.4rem; margin-bottom: 0.6rem; }
`;
document.head.appendChild(style);
