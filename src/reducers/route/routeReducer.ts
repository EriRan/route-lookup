import {
  SET_START_STOP,
  SET_DESTINATION_STOP,
  STOP_CLICKED,
} from "../../actions/route/actions";

import {
  appendCalculatedRoute,
  changeStartOrDestination,
} from "./change/stopsStateChangeDeducer";
import { Action, RouteStore } from "./types";

const INITIAL_STATE: RouteStore = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

export const REDUCERS = (state = INITIAL_STATE, action: Action) => {
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
