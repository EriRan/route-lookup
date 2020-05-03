import React from "react";

import TrafficNetworkContainer from "./markers/TrafficNetworkContainer";
import { provideBusStopLocations } from "./markers/stop/location/busStopLocationProvider";
import { MAP_PADDING } from "./MapViewConstant";
import "./MapView.css";

class MapView extends React.Component {
  render() {
    //Start from the first bus stop in the props and crawl to next ones through the roads.
    const busStopLocations = provideBusStopLocations(
      this.props.transportData.stops.values().next().value
    );
    return (
      <div className="map-background">
        <svg
          width={busStopLocations.xMax + MAP_PADDING}
          height={busStopLocations.yMax + MAP_PADDING}
        >
          <TrafficNetworkContainer
            stops={this.props.transportData.stops}
            busStopLocationsMap={busStopLocations.map}
          />
        </svg>
      </div>
    );
  }

  componentDidMount() {
    window.scrollTo(500, 0);
  }
}

export default MapView;
