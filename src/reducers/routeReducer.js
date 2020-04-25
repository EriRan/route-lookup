import {
  SET_ROUTE,
  SET_START_STOP,
  SET_DESTINATION_STOP,
} from "../actions/route/types";

const INITIAL_STATE = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, calculatedRoute: action.payload };
    case SET_START_STOP:
      return { ...state, startStop: action.payload };
    case SET_DESTINATION_STOP:
      return { ...state, destinationStop: action.payload };
    default:
      return state;
  }
};
