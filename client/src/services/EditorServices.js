import axios from "axios";

const getStatistics = async () => await (await fetch("/editor/stats")).json();

const addBlog = async (blogData) => {
  const res = await axios.post("/editor/addBlog", blogData);

  return res;
};

const promoteToEditor = async () => await axios.patch("/editor/apply");

export default {
  getStatistics,
  addBlog,
  promoteToEditor,
};
