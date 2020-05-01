import React from "react";

import TrafficNetworkContainer from "./markers/TrafficNetworkContainer";
import "./MapView.css";

export default ({ transportData }) => {
  return (
    <svg className="map-view" width="1500" height="1000">
      <TrafficNetworkContainer stops={transportData.stops} />
    </svg>
  );
};
