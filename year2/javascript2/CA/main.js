import "/style.css";

import checkNavbarState from "./modules/navbar.mjs";
import { createPost } from "./modules/post.mjs";

checkNavbarState();
const posts_container = document.querySelector("#posts_container");
const loading_container = document.querySelector("#loading_container");
const postForm = document.querySelector("#addPostForm");
const newest = document.querySelector("#newest");
const oldest = document.querySelector("#oldest");
const sortPopularity = document.querySelector("#sortPopularity");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const media = e.target[0].value;
  const title = e.target[1].value;
  const tags = e.target[2].value;
  const body = e.target[3].value;

  createPost(title, body, tags, media);
});

const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/<id>",
};

/* 
LOGIN INFO
 name: "magugu", // Required
      email: "matgum51873@stud.noroff.no", // Required
      password: "aaiiuues", // Required
*/

async function getAllPosts() {
  loading_container.classList.remove("hidden");
  const response = await fetch(
    API_ENDPOINTS.base +
      API_ENDPOINTS.all_posts +
      "?_author=true&_comments=true&_reactions=true&limit=100&offset=0",
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  const data = await response.json();
  loading_container.classList.add("hidden");

  return data;
}

const addPosts = async (data) => {
  if (!data.length > 0) {
    return;
  }

  data.map((post) => {
    const isUserPost = post.author?.email === localStorage.getItem("email");

    posts_container.innerHTML += `
    <div
    key="${post.id}"
    class="flex-grow w-[90vw] bg-white border  p-6 flex flex-col gap-3 max-w-3xl relative shadow border-theme_dark/10 rounded-t-md"
  >
  ${
    isUserPost
      ? `<a href='/posts/post.html?id=${post.id}' class='z-40 absolute top-6 right-12 border text-sm hover:bg-theme_dark hover:text-white duration-200 border-theme_dark text-theme_dark h-8 rounded px-5 flex items-center justify-center'>Edit Post</a>`
      : ""
  }

  <a href="/posts/post.html?id=${
    post.id
  }" class="flex flex-col  justify-start gap-3 w-full">
    <div class="flex items-center justify-start gap-3 w-full">
      <h2 class="text-theme_dark font-bold text-xl">
      ${post.title}
      </h2>
    <p class="text-sm text-gray-600 font-medium">${post.author.name}</p>
     
    </div>
    <p class="text-theme_dark text-sm max-h-12 truncate">
    ${post.body}

    </p>
    <div class="text-sm font-light flex gap-4 text-theme_dark">
      Movie, Sucks, I am pissed,
    </div>
    </a>
    <!-- Button form -->


    <!-- Button form -->
    
    <div
      class="w-full aspect-video border-t flex items-center justify-center ${
        post.media ? "" : "hidden"
      }"
    >
      <img class="w-[95%] aspect-video  rounded" src="
    ${post.media}
    "></img>
    </div>

    <div class="flex flex-col gap-4 px-4 text-theme_dark pb-3">
      <div class="w-full h-[1px] bg-theme_dark/10"></div>

      <!-- Comment form -->

      <!-- Comment form -->

      <!-- Comment -->
      <div class="text-sm flex gap-2">
        <p class="truncate"></p>
        <a
          href="/posts/post.html?id=${post.id}"
          class="text-blue-900"
          >...more</a
        >
      </div>
      <!-- Comment -->
    </div>
  </div>
    `;
  });
};

const data = await getAllPosts();

const dataObj = { data };

addPosts(dataObj.data);

const filterPopularity = () => {
  return data.sort((a, b) => {
    a.reactions.length - b.reactions.length;
  });
};
const filter_arr = async (arr, text, method) => {
  let tmp_arr = arr;
  switch (method) {
    case "newest":
      tmp_arr = data.sort(function (a, b) {
        let dateA = new Date(a.date).getTime();
        let dateB = new Date(b.date).getTime();
        if (dateA < currentDate || dateB < currentDate) {
          return -1;
        }
        return dateA - dateB;
      });
      return tmp_arr;

    case "oldest":
      tmp_arr = data.sort(function (a, b) {
        let dateA = new Date(a.date).getTime();
        let dateB = new Date(b.date).getTime();
        if (dateA < currentDate || dateB < currentDate) {
          return -1;
        }
        return dateB - dateA;
      });
      return tmp_arr;

    default:
      return arr;
  }
};

newest.addEventListener("click", (e) => {
  e.preventDefault();

  posts_container.innerHTML = "";
  dataObj.data = sortBySoonest(dataObj.data);
  addPosts(dataObj.data);
});
oldest.addEventListener("click", (e) => {
  e.preventDefault();
  posts_container.innerHTML = "";

  dataObj.data = sortByOldest(dataObj.data);
  addPosts(dataObj.data);
});
sortPopularity.addEventListener("click", (e) => {
  e.preventDefault();

  posts_container.innerHTML = "";

  dataObj.data = filterPopularity(dataObj.data);
  addPosts(dataObj.data);
});
addPosts(dataObj.data);

const modal = document.querySelector("#backdrop-container");
const modalbtn = document.querySelector("#modalbtn");
const modalContainer = document.querySelector("#modal-container");
modal.addEventListener("click", () => {
  hidemodal();
});
modalbtn.addEventListener("click", () => {
  hidemodal();
});
const hidemodal = () => {
  modal.classList.add("hidden");
  modalContainer.classList.add("hidden");
};
const addPostBtn = document.querySelector("#addPostBtn");
addPostBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modalContainer.classList.remove("hidden");
});
