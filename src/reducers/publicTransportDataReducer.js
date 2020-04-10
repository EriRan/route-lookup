import {
  GET_DATA
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      print(action.payload);
      return {...state, [action.payload.id]: action.payload};
    default:
      return state;
  }
};