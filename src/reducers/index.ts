import { combineReducers } from "redux";
import { LANGUAGE_REDUCERS } from "./language/languageReducer";
import { REDUCERS as ROUTE_REDUCERS } from "./route/routeReducer";

export default combineReducers({
  route: ROUTE_REDUCERS,
  language: LANGUAGE_REDUCERS
});
