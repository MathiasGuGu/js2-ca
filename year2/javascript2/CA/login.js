import signIn from "./modules/login.mjs";
import checkNavbarState from "./modules/navbar.mjs";

const addPostForm = document.querySelector("#addPostForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");

checkNavbarState();

addPostForm.addEventListener("submit", (e) => {
  const email = e.target[0].value;
  const password = e.target[1].value;
  signIn(`${email}`, `${password}`);
});
/* 
LOGIN INFO
 name: "magugu", // Required
      email: "matgum51873@stud.noroff.no", // Required
      password: "aaiiuues", // Required
*/
