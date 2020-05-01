import { DO_SCROLL } from "./types";

export const doScroll = (
  isScrolling,
  scrollLeft,
  scrollTop,
  clientX,
  clientY
) => {
  return {
    type: DO_SCROLL,
    payload: {
      isScrolling: isScrolling,
      scrollLeft: scrollLeft,
      scrollTop: scrollTop,
      clientX: clientX,
      clientY: clientY,
    },
  };
};
