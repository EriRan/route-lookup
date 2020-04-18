import React from "react";

import MapView from "./map/MapView";
import Sidebar from "./sidebar/Sidebar";

const App = () => {
  return (
    <div className="ui container">
      <Sidebar />
      <MapView />
    </div>
  );
};

export default App;