import React from "react";

import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";

const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  return (
    <div className="ui container">
      <UiContainer transportData={transportData} />
      <MapView stops={transportData.stops} />
    </div>
  );
};

export default App;
