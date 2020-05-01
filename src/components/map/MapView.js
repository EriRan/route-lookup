import React from "react";

import TrafficNetworkContainer from "./markers/TrafficNetworkContainer";
import "./MapView.css";

class MapView extends React.Component {
  render() {
    return (
      <svg className = "map-view" width="1800" height="1000">
        <TrafficNetworkContainer stops={this.props.transportData.stops} />
      </svg>
    );
  }

  componentDidMount() {
    window.scrollTo(500, 0);
  }
}

export default MapView;
