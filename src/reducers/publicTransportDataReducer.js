import { GET_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      console.log("At getDataReducer");
      return [
        ...state,
        {
          stops: action.payload.pysakit,
          roads: action.payload.tiet,
          busLines: action.payload.linjastot,
        },
      ];
    default:
      return state;
  }
};
