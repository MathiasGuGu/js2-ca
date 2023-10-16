const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/<id>",
};

const signIn = async (email, password) => {
  try {
    const response = await fetch(API_ENDPOINTS.base + API_ENDPOINTS.login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    window.location.replace("/feed.html");

    console.log(data);
    if (!data.errors) {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("avatar", data.avatar);
      login_btn.classList.add("hidden");
      register_btn.classList.add("hidden");
      navbarUserIcon.classList.remove("hidden");
    }
  } catch (e) {
    throw new Error(e);
  }
};

export default signIn;
