import React from "react";

import MapView from "./map/MapView"
import Sidebar from "./sidebar/Sidebar"

import TransportDataProvider from "../../data/TransportDataProvider";

class RouteContainer extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    return (
      <div>
        <MapView transportData={transportData}/>
        <Sidebar transportData={transportData}/>
      </div>
    );
  }
}

export default RouteContainer;
