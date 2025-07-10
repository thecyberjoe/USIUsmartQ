if (sessionStorage.getItem('loggedIn') !== 'true') {
  // Not logged in? Redirect to login
  alert("Please log in first!");
  window.location.href = "index.html";
}
const queues = {
  accounts: [],
  library: [],
  registrar: [],
  advisor: []
};

const user = sessionStorage.getItem("loggedInUser") || "You";

function joinQueue(service) {
  const queue = queues[service];
  if (queue.includes(user)) {
    alert("Already in the queue.");
    return;
  }

  queue.push(user);
  const position = queue.length;
  document.getElementById(`${service}-status`).innerText =
    `You are number ${position} in line.`;

  if (position <= 3) {
    alert(`Your turn is near! Please head to the ${capitalize(service)}.`);
  }
}

function cancelQueue(service) {
  const queue = queues[service];
  const index = queue.indexOf(user);
  if (index !== -1) {
    queue.splice(index, 1);
    document.getElementById(`${service}-status`).innerText = `Not in queue`;
    alert(`Removed from the ${capitalize(service)} queue.`);
  } else {
    alert("You are not in this queue.");
  }
}
function logout() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = "index.html";
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});