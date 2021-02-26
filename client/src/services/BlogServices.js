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

const getMetadata = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const res = await fetch(`/public/blog/metadata?id=${id}`);

  return res.json();
};

const getBlogsByCategory = async (num, category) => {
  const res = await fetch(`/public/${num}/${category}`);

  const jsonData = await res.json();
  return jsonData;
};

const getBookmarkedBlogs = async () => {
  const res = await fetch("/public/blogs/bookmarked");

  const jsonData = await res.json();
  return jsonData;
};

const addComment = async (data, blogID) => {
  const res = await fetch(`/public/blogs/${blogID}/addComment`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await res.json();
  return jsonData;
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
  getMetadata,
  getBlogsByCategory,
  getSinglePublishedBlog,
  getBookmarkedBlogs,
  addComment,
  likeBlog,
  dislikeBlog,
  bookmarkBlog,
  unBookmarkBlog,
  updateBlogView,
};
