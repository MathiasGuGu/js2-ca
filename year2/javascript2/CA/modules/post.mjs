// /social/posts
const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/",
};

export const editPost = async (id, title, body, tags, media) => {
  console.log(id);
  try {
    const response = await fetch(API_ENDPOINTS.base + "/social/posts/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags: [tags],
        media,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSinglePost = async (id) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.base +
        API_ENDPOINTS.single_post +
        id +
        "?_author=true&_comments=true&_reactions=true",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (title, body, tags, media) => {
  if (title.length < 1) {
    throw new Error("Title is required to post");
  }

  try {
    const response = await fetch(API_ENDPOINTS.base + "/social/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags: [tags],
        media,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
};
export const deletePost = async (id) => {
  if (id.length < 1) {
    throw new Error("Title is required to post");
  }

  try {
    const response = await fetch(API_ENDPOINTS.base + `/social/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
};

/* 
{
  "title": "string", // Required
  "body": "string", // Optional
  "tags": ["string"], // Optional
  "media": "https://url.com/image.jpg" // Optional
}

*/
