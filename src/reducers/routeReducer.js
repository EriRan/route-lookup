import { SET_ROUTE } from "../actions/route/types";

const INITIAL_STATE = {
  routeData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
