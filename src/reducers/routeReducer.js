import {
  SET_ROUTE,
  SET_START_STOP,
  SET_DESTINATION_STOP,
} from "../actions/route/types";

const INITIAL_STATE = {
  calculatedRoute: null,
  startStop: null,
  destinationStop: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, calculatedRoute: action.payload };
    case SET_START_STOP:
      return { ...state, startStop: action.payload.startStop };
    case SET_DESTINATION_STOP:
      return { ...state, destinationStop: action.payload.destinationStop };
    default:
      return state;
  }
};
