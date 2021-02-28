import axios from "axios";

const getStatistics = async () => await (await fetch("/editor/stats")).json();

const addBlog = async (blogData) => {
  const res = await axios.post("/editor/addBlog", blogData);

  return res;
};

export default {
  getStatistics,
  addBlog,
};
