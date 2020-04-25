import React from "react";

import TrafficNetworkContainer from "./markers/TrafficNetworkContainer";
import TransportDataProvider from "../../../data/TransportDataProvider";
import "./MapView.css";

class MapView extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    return (
      <svg className = "map-view" width="1500" height="1000">
        <TrafficNetworkContainer stops={transportData.stops} />
      </svg>
    );
  }
}

export default MapView;
