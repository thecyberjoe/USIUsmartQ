const miniToggle = document.getElementById("themeToggle");
if (miniToggle) {
  const pref = localStorage.getItem("theme") || "light";
  if (pref === "dark") document.body.classList.add("dark");
  miniToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
  miniToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
    miniToggle.textContent = mode === "dark" ? "☀️" : "🌙";
  };
}
