import React from "react";

import MapView from "./map/MapView"
import Sidebar from "./sidebar/Sidebar"

import TransportDataSingleton from "../../data/TransportDataSingleton";

class RouteContainer extends React.Component {
  render() {
    var transportData = TransportDataSingleton.getInstance();
    return (
      <div>
        <MapView transportData={transportData}/>
        <Sidebar transportData={transportData}/>
      </div>
    );
  }
}

export default RouteContainer;
