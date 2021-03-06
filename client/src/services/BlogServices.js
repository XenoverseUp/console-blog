import axios from "axios";

const getAllPublishedBlogs = async ({ pageParam }) => {
  pageParam = pageParam ?? 1;
  const res = await fetch(`/public/blogs?page=${pageParam}`);

  return res.json();
};

const getTopBlogs = async () => (await fetch("/public/blogs/top")).json();

const getSinglePublishedBlog = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const res = await fetch(`/public/blog?id=${id}`);

  return res.json();
};

const getRecommendations = async ({ queryKey }) => {
  const [, { id, category }] = queryKey;
  return await (
    await fetch(`/public/blog/recommendeds?category=${category}&id=${id}`)
  ).json();
};

const getBlogsByCategory = async (num, category) => {
  const res = await fetch(`/public/${num}/${category}`);

  const jsonData = await res.json();
  return jsonData;
};

const getBookmarkedBlogs = async ({ pageParam }) => {
  pageParam = pageParam ?? 1;
  const res = await fetch(`/public/blogs/bookmarked?page=${pageParam}`);

  return res.json();
};

const getComments = async ({ pageParam, id }) => {
  pageParam = pageParam ?? 1;
  const res = await fetch(`/public/blog/comment?page=${pageParam}&id=${id}`);

  return res.json();
};

const addComment = async ({ data, id }) => {
  const res = await fetch(`/public/blog/addComment?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const likeBlog = async (blogID) => {
  const res = await fetch(`/public/blog/like?id=${blogID}`, {
    method: "PATCH",
  });

  return res.json();
};

const dislikeBlog = async (blogID) => {
  const res = await fetch(`/public/blog/dislike?id=${blogID}`, {
    method: "PATCH",
  });

  return res.json();
};

const bookmarkBlog = async (blogID) => {
  const res = await fetch(`/public/blog/bookmark?id=${blogID}`, {
    method: "PATCH",
  });

  return res.json();
};

const unBookmarkBlog = async (blogID) => {
  const res = await fetch(`/public/blog/unbookmark?id=${blogID}`, {
    method: "PATCH",
  });

  return res.json();
};

const updateBlogView = async (blogID) => {
  const res = await fetch(`/public/blog/views?id=${blogID}`, {
    method: "PATCH",
  });

  return res.json();
};

export default {
  getAllPublishedBlogs,
  getTopBlogs,
  getBlogsByCategory,
  getSinglePublishedBlog,
  getRecommendations,
  getComments,
  getBookmarkedBlogs,
  addComment,
  likeBlog,
  dislikeBlog,
  bookmarkBlog,
  unBookmarkBlog,
  updateBlogView,
};
