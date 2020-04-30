import {
  SET_START_STOP,
  SET_DESTINATION_STOP,
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
    default:
      return state;
  }
};

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
