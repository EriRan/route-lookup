import _ from "lodash";

import { SET_START_STOP, SET_DESTINATION_STOP } from "./types";

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
