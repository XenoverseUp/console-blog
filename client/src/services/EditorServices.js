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
  const res = await fetch("/editor/addBlog", {
    method: "POST",
    body: JSON.stringify(blogData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await res.json();
  return jsonData;
};

export default {
  getEditorsAllWritings,
  getSingleUnpublishedWriting,
  addBlog,
};
