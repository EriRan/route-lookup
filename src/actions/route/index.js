import { SET_ROUTE } from "./types";

export const calculateRoute = (routeData) => {
  return {
    type: SET_ROUTE,
    payload: {
      routeData: {routeData}
    },
  };
};
