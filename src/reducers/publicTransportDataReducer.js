import { GET_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        stops: action.payload.stops,
        roads: action.payload.roads,
        busLines: action.payload.busLines,
      };
    default:
      return state;
  }
};
