const getAllUnpublishedBlogs = async () => {
  const res = await fetch("/admin/unconfirmedBlogs");

  const jsonData = await res.json();
  return jsonData;
};

const getSingleUnpublishedBlog = async (blogID) => {
  const res = await fetch(`/admin/blogs/${blogID}`);

  const jsonData = await res.json();
  return jsonData;
};

const confirmBlog = async (blogID) => {
  const res = await fetch(`/admin/${blogID}/confirmBlog`, {
    method: "PUT",
  });

  const jsonData = await res.json();
  return jsonData;
};

const deleteBlog = async (blogID) => {
  const res = await fetch(`/admin/${blogID}/deleteBlog`, {
    method: "DELETE",
  });

  const jsonData = await res.json();
  return jsonData;
};

export default {
  getAllUnpublishedBlogs,
  getSingleUnpublishedBlog,
  confirmBlog,
  deleteBlog,
};
