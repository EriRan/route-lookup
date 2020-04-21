import React from "react";

import MapView from "./map/MapView";
import Sidebar from "./sidebar/Sidebar";
import HeaderBar from "./header/HeaderBar";

const App = () => {
  return (
    <div className="ui container">
      <HeaderBar />
      <Sidebar />
      <MapView />
    </div>
  );
};

export default App;