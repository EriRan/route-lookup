import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import publicTransportDataReducer from "./publicTransportDataReducer";

export default combineReducers({
  form: formReducer,
  publicTransport: publicTransportDataReducer
});