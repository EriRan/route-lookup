import React from "react";

import HeaderBar from "./header/HeaderBar";
import RouteLayer from "./route/RouteLayer";

const App = () => {
  return (
    <div className="ui container">
      <HeaderBar />
      <RouteLayer />
    </div>
  );
};

export default App;