import { combineReducers } from "redux";
import { LANGUAGE_REDUCERS } from "./language/languageReducer";
import { REDUCERS as ROUTE_REDUCERS } from "./route/routeReducer";
import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";

export const createRouteLookupStore = () => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // Creation of root reducers
  const reducers = combineReducers({
    route: ROUTE_REDUCERS,
    language: LANGUAGE_REDUCERS,
  });
  // Apply reducers and middleware to the store
  return createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
}
