const translateDownAndFadeOut = {
  initial: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
  },

  exit: {
    y: [0, 50],
    opacity: 0,
  },
};

export default translateDownAndFadeOut;
