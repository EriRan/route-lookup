import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import sidebarReducer from "./sidebar/sidebarReducer";
import routeReducer from "./route/routeReducer";

export default combineReducers({
  form: formReducer,
  sidebar: sidebarReducer,
  route: routeReducer,
});
