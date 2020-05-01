import React from "react";

import TrafficNetworkContainer from "./markers/TrafficNetworkContainer";
import "./MapView.css";

class MapView extends React.Component {
  render() {
    return (
      <svg className = "map-view" width="2500" height="1000">
        <TrafficNetworkContainer stops={this.props.transportData.stops} />
      </svg>
    );
  }
}

export default MapView;
