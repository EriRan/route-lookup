import { DO_SCROLL } from "../../actions/map/types";

const INITIAL_STATE = {
  isScrolling: false,
  scrollLeft: null,
  scrollTop: null,
  clientX: null,
  clientY: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_SCROLL:
      return { ...state, scrollController: action.payload };
    default:
      return state;
  }
};
