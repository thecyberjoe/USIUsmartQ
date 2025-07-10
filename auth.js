function loginUser(event) {
  event.preventDefault(); // Prevent page reload

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Dummy check (replace with real validation later)
  if (email && password) {
    // Save login state
    sessionStorage.setItem('loggedIn', 'true');
    function logout() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = "index.html";
}

    // Redirect to services
    window.location.href = "services.html";
  } else {
    alert("Please enter valid credentials");
  }
}