const getAllPublishedBlogs = async (num = 5) => {
  const res = await fetch(`/public/blogs?num=${num}`);

  return res.json();
};

const getBlogsByCategory = async (num, category) => {
  const res = await fetch(`/public/${num}/${category}`);

  const jsonData = await res.json();
  return jsonData;
};

const getSinglePublishedBlog = async (blogID) => {
  const res = await fetch(`/public/blogs/${blogID}`);

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
  const res = await fetch(`/public/blogs/${blogID}/like`, {
    method: "PUT",
  });

  const jsonData = res.json();
  return jsonData;
};

const dislikeBlog = async (blogID) => {
  const res = await fetch(`/public/blogs/${blogID}/dislike`, {
    method: "PUT",
  });

  const jsonData = res.json();
  return jsonData;
};

const bookmarkBlog = async (blogID) => {
  const res = await fetch(`/public/blogs/${blogID}/bookmark`, {
    method: "PUT",
  });

  const jsonData = res.json();
  return jsonData;
};

const unBookmarkBlog = async (blogID) => {
  const res = await fetch(`/public/blogs/${blogID}/unbookmark`, {
    method: "DELETE",
  });

  const jsonData = res.json();
  console.log(jsonData);
  return jsonData;
};

const updateBlogView = async (blogID) => {
  const res = await fetch(`/public/blogs/${blogID}/views`, {
    method: "PUT",
  });

  const jsonData = res.json();
  return jsonData;
};

export default {
  getAllPublishedBlogs,
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
