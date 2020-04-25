import { SET_ROUTE, SET_START_STOP, SET_DESTINATION_STOP } from "./types";

export const setRoute = (routeData) => {
  return {
    type: SET_ROUTE,
    payload: {
      routeData: { routeData },
    },
  };
};

export const setStartStop = (startStop) => {
  return {
    type: SET_START_STOP,
    payload: {
      startStop: startStop,
    },
  };
};

export const setDestinationStop = (destinationStop) => {
  return {
    type: SET_DESTINATION_STOP,
    payload: {
      destinationStop: destinationStop,
    },
  };
};
