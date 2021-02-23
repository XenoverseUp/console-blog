import axios from "axios";

const getAllUnpublishedBlogs = async () => {
  const res = await axios.get("/admin/unconfirmed");

  return res;
};

const getSingleUnpublishedBlog = async ({ queryKey }) => {
  const [_, { id }] = queryKey;

  const res = await fetch(`/admin/blogs/${id}`);

  return res.json();
};

const confirmBlog = async (blogID) => {
  const res = await axios.put(`/admin/${blogID}/confirmBlog`);

  return res;
};

const deleteBlog = async (blogID) => {
  const res = await axios.delete(`/admin/${blogID}/deleteBlog`);

  return res;
};

export default {
  getAllUnpublishedBlogs,
  getSingleUnpublishedBlog,
  confirmBlog,
  deleteBlog,
};
