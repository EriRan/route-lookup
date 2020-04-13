import React from "react";
import _ from "lodash";

import BusStop from "./stop/BusStop";
import BusStopLocationProvider from "./stop/BusStopLocationProvider";
import "./TrafficNetworkContainer.css";
import RoadContainer from "./road/RoadContainer";

class BusTrafficContainer extends React.Component {
  render() {
    return (
      <g className="bus-traffic-container">{this.renderTrafficNetwork()}</g>
    );
  }

  renderTrafficNetwork() {
    if (!_.isUndefined(this.props.stops) && !_.isNull(this.props.stops)) {
      const busStopLocationsMap = new BusStopLocationProvider().provide(
        this.props.stops[0]
      );
      return (
        <g className="bus-traffic-container">
          {this.renderBusStops(busStopLocationsMap)}
          {this.renderRoads(busStopLocationsMap, this.props.stops)}
        </g>
      );
    } else {
      return "Loading bus stops...";
    }
  }

  renderBusStops(busStopLocationsMap) {
    return (
      <g className="bus-stop-container">
        {Array.from(busStopLocationsMap.entries()).map((entry) => {
          return (
            <BusStop
              key={`stop-${entry[0]}`}
              name={entry[0]}
              x={entry[1].x}
              y={entry[1].y}
            />
          );
        })}
      </g>
    );
  }

  renderRoads(busStopLocationsMap, stops) {
    return (
      <RoadContainer busStopLocationMap={busStopLocationsMap} stops={stops} />
    );
  }
}

export default BusTrafficContainer;
