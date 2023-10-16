import "/style.css";

import { getSinglePost, editPost, deletePost } from "../modules/post.mjs";
import checkNavbarState from "../modules/navbar.mjs";
checkNavbarState();

const body = document.querySelector("#postBody");
const title = document.querySelector("#postTitle");
const tagsContainer = document.querySelector("#postTagsContainer");
const commentContainer = document.querySelector("#postCommentContainer");
const postImg = document.querySelector("#postImg");
const author = document.querySelector("#postAuthor");

const deleteBtn = document.querySelector("#deleteBtn");

const form = document.querySelector("#editPostForm");
const editBtn = document.querySelector("#editBtn");
const backdrop = document.querySelector("#backdrop-container");
const modalContainer = document.querySelector("#modal-container");

const formTitle = document.querySelector("#formTitle");
const postText = document.querySelector("#postText");
const postImgUrl = document.querySelector("#postImgUrl");
const postTags = document.querySelector("#postTags");

const id = window.location.href.split("=")[1];
console.log(id);
const data = await getSinglePost(id);

const isUsersPost = data.author.email === localStorage.getItem("email");

if (isUsersPost) {
  editBtn.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
}

formTitle.placeholder = data.title;
postText.placeholder = data.body;
postImgUrl.placeholder = data.media;

body.textContent = data.body;
title.textContent = data.title;
author.textContent = data.author.name;
postImg.src = data.media;

editBtn.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  modalContainer.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const media = e.target[0].value;
  const title = e.target[1].value;
  const tags = e.target[2].value;
  const body = e.target[3].value;
  console.log(id);
  editPost(id, title, body, tags, media);

  console.log(e);
});

deleteBtn.addEventListener("click", async () => {
  await deletePost(id);
  window.location.replace("/feed.html");
});

data.tags.map((tag) => {
  tagsContainer.textContent += tag;
});
