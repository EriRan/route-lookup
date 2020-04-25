import {
  SET_ROUTE,
  SET_START_STOP,
  SET_DESTINATION_STOP,
} from "../actions/route/types";

const INITIAL_STATE = {
  routeData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: action.payload };
      case SET_START_STOP:
      return { ...state, startStop: action.payload };
      case SET_DESTINATION_STOP:
      return { ...state, destinationStop: action.payload };
    default:
      return state;
  }
};
