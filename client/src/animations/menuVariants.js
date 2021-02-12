const menuVariants = (a) => ({
  initial: {
    x: a === "main" ? "-100%" : "100%",
    position: "absolute",
  },
  visible: {
    x: 0,
    position: "static",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
  exit: {
    x: a === "main" ? "-100%" : "100%",
    position: "absolute",
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
});

export default menuVariants;
