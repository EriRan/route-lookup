import { combineReducers } from "redux";
import { REDUCERS } from "./route/routeReducer";

export default combineReducers({
  route: REDUCERS,
});
