// Handle Signup
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) window.location.href = "/profile.html";
});

// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (res.ok) window.location.href = "/profile.html";
});

// Load Profile Data
if (window.location.pathname.endsWith("profile.html")) {
  fetch("/profile")
    .then((res) => res.json())
    .then((user) => {
      if (user?.name) document.querySelector("[name=name]").value = user.name;
      if (user?.age) document.querySelector("[name=age]").value = user.age;
      if (user?.course) document.querySelector("[name=course]").value = user.course;
    });

  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    await fetch("/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Profile updated!");
  });

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await fetch("/auth/logout");
    window.location.href = "/";
  });
}
