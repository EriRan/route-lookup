import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  form: formReducer,
  sidebar: sidebarReducer
});