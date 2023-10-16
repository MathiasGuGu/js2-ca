import checkNavbarState from "./modules/navbar.mjs";
import register from "./modules/register.mjs";

checkNavbarState();

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", (e) => {
  const name = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const avatar = e.target[3].value;
  const banner = e.target[4].value;
  register(name, email, password, avatar, banner);
});
