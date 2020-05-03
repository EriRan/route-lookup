import {
  SET_START_STOP,
  SET_DESTINATION_STOP,
  STOP_CLICKED,
} from "../../actions/route/types";
import RouteCalculator from "./calculation/RouteCalculator";
import TransportDataSingleton from "../../data/TransportDataSingleton";
import { isUndefinedOrNullOrEmptyString } from "../../util/Utilities";

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
      return appendStartOrDestination(state, action.payload);
    default:
      return state;
  }
};

function appendStartOrDestination(currentState, payload) {
  if (payload.hasError) {
    return currentState;
  }
  if (!hasUsableInput(currentState.startStop)) {
    return appendCalculatedRoute({
      ...currentState,
      startStop: payload,
    });
  } else {
    return appendCalculatedRoute({
      ...currentState,
      destinationStop: payload,
    });
  }
}

function appendCalculatedRoute(currentState) {
  if (
    hasUsableInput(currentState.startStop) &&
    hasUsableInput(currentState.destinationStop)
  ) {
    currentState.calculatedRoute = new RouteCalculator(
      TransportDataSingleton.getInstance()
    ).calculate(currentState.startStop.name, currentState.destinationStop.name);
  } else {
    currentState.calculatedRoute = null;
  }
  return currentState;
}

function hasUsableInput(targetStop) {
  return (
    !isUndefinedOrNullOrEmptyString(targetStop.name) && !targetStop.hasError
  );
}
