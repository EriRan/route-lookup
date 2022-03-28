import { render } from "react-dom";
import { Provider } from "react-redux";
import './i18n';

import App from "./components/App";
import createRouteLookupStore from "./reducers/createStore";



render(
  <Provider store={createRouteLookupStore()}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
