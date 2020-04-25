import { CALCULATE_ROUTE } from "./types";

export const calculateRoute = (startStop, destinationStop) => {
  return {
    type: CALCULATE_ROUTE,
    payload: {
      startStop: { startStop },
      destinationStop: { destinationStop },
    },
  };
};
