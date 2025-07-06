const servicesEl = document.getElementById("services");
const leaveBtn = document.getElementById("leaveQueue");
const searchBox = document.getElementById("searchBox");
let queueCounts = {}; // { Library: 3, "Cafeteria": 4, ... }
let currentQueue = null; // user’s active queue name
const estPerPerson = 2; // minutes per person

/* -------- Utility helpers -------- */
const slug = (str) => str.toLowerCase().replace(/ /g, "-");
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}
function saveState() {
  localStorage.setItem("queueCounts", JSON.stringify(queueCounts));
  if (currentQueue) localStorage.setItem("currentQueue", currentQueue);
  else localStorage.removeItem("currentQueue");
}

/* -------- Render services list -------- */
function renderServices(data = queueCounts) {
  servicesEl.innerHTML =
    "<h3>Available Services</h3>" +
    Object.keys(data)
      .map(
        (s) => `
      <div class="queue-card">
      <button class="btn-glow" onclick="joinQueue('${s}')">Join Queue</button>
        <div>
          <strong>${s}</strong><br>
          <span id="${slug(s)}-count">${data[s]} more people in line</span>
        </div>
        <button onclick="joinQueue('${s}')">Join Queue</button>
      </div>`
      )
      .join("");
}

/* -------- Join & Leave logic -------- */
function updateStatus(service) {
  const pos = queueCounts[service];
  document.getElementById("position").textContent = pos;
  document.getElementById("wait").textContent = `${pos * estPerPerson} min`;
}

function joinQueue(service) {
  if (currentQueue) {
    showToast(`You are already in the ${currentQueue} queue.`);
    return;
  }
  queueCounts[service]++;
  currentQueue = service;
  document.getElementById(
    `${slug(service)}-count`
  ).textContent = `${queueCounts[service]} more people in line`;
  updateStatus(service);
  leaveBtn.style.display = "inline-block";
  showToast(`✅ Joined the ${service} queue`);
  if (queueCounts[service] <= 2)
    showToast(`⏰ Almost your turn for ${service}!`);
  saveState();
}

if (leaveBtn) {
  leaveBtn.addEventListener("click", () => {
    if (!currentQueue) return;
    queueCounts[currentQueue] = Math.max(queueCounts[currentQueue] - 1, 0);
    document.getElementById(
      `${slug(currentQueue)}-count`
    ).textContent = `${queueCounts[currentQueue]} more people in line`;
    currentQueue = null;
    document.getElementById("position").textContent = "-";
    document.getElementById("wait").textContent = "-";
    leaveBtn.style.display = "none";
    showToast("You left the queue");
    saveState();
  });
}

/* -------- Search filter -------- */
if (searchBox) {
  searchBox.addEventListener("input", (e) => {
    const kw = e.target.value.toLowerCase();
    const filtered = Object.fromEntries(
      Object.entries(queueCounts).filter(([name]) =>
        name.toLowerCase().includes(kw)
      )
    );
    renderServices(filtered);
  });
}

/* -------- Initial load -------- */
function restoreFromLocal() {
  const savedCounts = localStorage.getItem("queueCounts");
  const savedCurrent = localStorage.getItem("currentQueue");
  if (savedCounts) queueCounts = JSON.parse(savedCounts);
  if (savedCurrent) currentQueue = savedCurrent;
}

fetch("queues.json")
  .then((r) => (r.ok ? r.json() : Promise.reject()))
  .then((data) => {
    queueCounts = data;
    restoreFromLocal();
    init();
  })
  .catch(() => {
    queueCounts = { Library: 3, Cafeteria: 4, "Accounts Office": 2 };
    restoreFromLocal();
    init();
  });

function init() {
  renderServices();
  if (currentQueue) {
    updateStatus(currentQueue);
    leaveBtn.style.display = "inline-block";
  }
}
