import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import sidebarReducer from "./sidebar/sidebarReducer";
import routeReducer from "./route/routeReducer";
import mapReducer from "./map/mapReducer";

export default combineReducers({
  form: formReducer,
  map: mapReducer,
  sidebar: sidebarReducer,
  route: routeReducer,
});
