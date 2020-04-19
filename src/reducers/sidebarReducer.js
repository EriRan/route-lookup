import { SIDEBAR_STATE_CHANGE } from "../actions/types";

const INITIAL_STATE = {
  isOpen: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_STATE_CHANGE:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
