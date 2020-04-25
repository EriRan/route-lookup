import React from "react";

import HeaderBar from "./header/HeaderBar";
import RouteContainer from "./route/RouteContainer";

const App = () => {
  return (
    <div className="ui container">
      <HeaderBar />
      <RouteContainer />
    </div>
  );
};

export default App;