const getDuration = (content) =>
  content ? Math.ceil(content.length / 800) : 0;

export default getDuration;
