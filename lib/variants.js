export const fadeInTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

export const fadeIn = {
  hidden: {
    opacity: 0,
    fadeInTransition,
  },
  show: {
    opacity: 1,
    fadeInTransition,
  },
};
