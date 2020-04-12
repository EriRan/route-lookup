import React from "react";

import BusTrafficContainer from "./markers/BusTrafficContainer";
import TransportDataProvider from "../../data/TransportDataProvider";
import "./MapView.css";

class MapView extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    return (
      <svg className = "map-view" width="1000" height="1000">
        <BusTrafficContainer stops={transportData.stops} />
      </svg>
    );
  }
}

export default MapView;
