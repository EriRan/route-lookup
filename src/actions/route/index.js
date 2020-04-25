import _ from "lodash";

import { SET_ROUTE, SET_START_STOP, SET_DESTINATION_STOP } from "./types";

export const setRoute = (routeData) => {
  return {
    type: SET_ROUTE,
    payload: {
      routeData: { routeData },
    },
  };
};

export const setStartStop = (startStop, hasError) => {
  return {
    type: SET_START_STOP,
    payload: {
      name: _.upperCase(startStop),
      hasError: hasError,
    },
  };
};

export const setDestinationStop = (destinationStop, hasError) => {
  return {
    type: SET_DESTINATION_STOP,
    payload: {
      name: _.upperCase(destinationStop),
      hasError: hasError,
    },
  };
};
