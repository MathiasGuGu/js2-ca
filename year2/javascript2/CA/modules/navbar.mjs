import signOut from "./signout.mjs";
// /social/posts
const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/",
};
const login_btn = document.querySelector("#login_btn");
const register_btn = document.querySelector("#register_btn");

const navbarUserIcon = document.querySelector("#navbarUserIcon");
const navbarUserImage = document.querySelector("#navbarUserImage");
const profileDropdown = document.querySelector("#profileDropdown");

const signout_btn = document.querySelector("#signOutBtn");

const searchbar = document.querySelector("#searchbar");
const searchIcon = document.querySelector("#searchIcon");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const searchBackdrop = document.querySelector("#searchBackdrop");
async function getAllPosts() {
  const response = await fetch(
    API_ENDPOINTS.base + API_ENDPOINTS.all_posts + "?_author=true&",
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  const data = await response.json();

  return data;
}
const data = await getAllPosts();
searchBackdrop.addEventListener("click", () => {
  searchBackdrop.classList.add("hidden");
  searchResults.classList.add("hidden");
});

searchInput.addEventListener("click", () => {
  searchBackdrop.classList.remove("hidden");
  searchResults.classList.remove("hidden");
});
searchInput.addEventListener("input", (e) => {
  searchResults.innerHTML = "";
  const filtered = data.filter((data) => {
    return (
      data.body.includes(e.target.value) || data.title.includes(e.target.value)
    );
  });

  filtered.map((results) => {
    searchResults.innerHTML += `
    <a href="/posts/post.html?id=${results.id}">${results.title}</a>
    `;
  });
});

navbarUserIcon.addEventListener("click", () => {
  if (profileDropdown.classList.contains("hidden")) {
    profileDropdown.classList.remove("hidden");
  } else {
    profileDropdown.classList.add("hidden");
  }
});

signout_btn.addEventListener("click", () => {
  signOut();
});

export default function checkNavbarState() {
  const loggedIn = localStorage.getItem("access_token") !== null;
  if (!loggedIn) return;
  navbarUserIcon.classList.remove("hidden");
  navbarUserImage.classList.remove("hidden");
  login_btn.classList.add("hidden");
  register_btn.classList.add("hidden");
  if (localStorage.getItem("avatar") !== "undefined" && null) {
    navbarUserImage.src = localStorage.avatar;
  } else {
    navbarUserImage.src =
      "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80";
  }
}
