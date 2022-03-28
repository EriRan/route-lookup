import { applyMiddleware, compose, createStore } from "redux";
import reducers from ".";
import reduxThunk from "redux-thunk";

export default function createRouteLookupStore() {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
};
