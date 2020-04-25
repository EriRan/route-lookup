import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import sidebarReducer from "./sidebarReducer";
import routeReducer from "./routeReducer";

export default combineReducers({
  form: formReducer,
  sidebar: sidebarReducer,
  route: routeReducer,
});
