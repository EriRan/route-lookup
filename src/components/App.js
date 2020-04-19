import React from "react";

import MapView from "./map/MapView";
import Sidebar from "./sidebar/Sidebar";
import SidebarOpenButton from "./sidebar/SidebarOpenButton";

const App = () => {
  return (
    <div className="ui container">
      <Sidebar />
      <SidebarOpenButton />
      <MapView />
    </div>
  );
};

export default App;