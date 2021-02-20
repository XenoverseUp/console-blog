import axios from "axios";

const getEditorsAllWritings = async () => {
  const res = await fetch("/editor/myBlogs");

  const jsonData = await res.json();
  return jsonData;
};

const getSingleUnpublishedWriting = async (blogID) => {
  const res = await fetch(`/editor/blogs/${blogID}`);

  const jsonData = await res.json();
  return jsonData;
};

const addBlog = async (blogData) => {
  const res = await axios.post("/editor/addBlog", blogData);

  return res;
};

export default {
  getEditorsAllWritings,
  getSingleUnpublishedWriting,
  addBlog,
};
