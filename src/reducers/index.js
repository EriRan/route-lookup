import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import routeReducer from "./route/routeReducer";

export default combineReducers({
  form: formReducer,
  route: routeReducer,
});
