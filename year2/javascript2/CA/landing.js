import "/style.css";

import signIn from "./modules/login.mjs";
import register from "./modules/register.mjs";
import checkNavbarState from "./modules/navbar.mjs";

checkNavbarState();
// BASE_URL = "https://api.noroff.dev/api/v1"
//
const login_btn = document.querySelector("#login_btn");
const register_btn = document.querySelector("#register_btn");
const posts_container = document.querySelector("#posts_container");
const reaction_btn = document.querySelector("#reaction_btn");
const comment_btn = document.querySelector("#comment_btn");
const comment_form = document.querySelector("#comment_form");

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
