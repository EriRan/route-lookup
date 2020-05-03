import {
  SET_START_STOP,
  SET_DESTINATION_STOP,
  STOP_CLICKED,
} from "../../actions/route/types";

import {
  appendCalculatedRoute,
  changeStartOrDestination,
} from "./change/stopsStateChangeDeducer";

const INITIAL_STATE = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_START_STOP:
      return appendCalculatedRoute({
        ...state,
        startStop: action.payload,
      });
    case SET_DESTINATION_STOP:
      return appendCalculatedRoute({
        ...state,
        destinationStop: action.payload,
      });
    case STOP_CLICKED:
      return changeStartOrDestination(state, action.payload);
    default:
      return state;
  }
};
