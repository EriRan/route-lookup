import { combineReducers } from "redux";
import routeReducer from "./route/routeReducer";

export default combineReducers({
  route: routeReducer,
});
