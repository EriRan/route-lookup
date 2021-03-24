import React from "react";

import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";

const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  return (
    <div className="ui container">
      <UiContainer transportData={transportData} />
      <MapView stopMap={transportData.stopMap} />
    </div>
  );
};

export default App;
