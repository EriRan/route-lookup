import React from "react";
import _ from "lodash";

import BusStop from "./stop/BusStop";
import "./TrafficNetworkContainer.css";
import RoadContainer from "./road/RoadContainer";

class BusTrafficContainer extends React.Component {
  render() {
    return (
      <g className="bus-traffic-container">{this.renderTrafficNetwork()}</g>
    );
  }

  renderTrafficNetwork() {
    if (_.isMap(this.props.busStopLocationsMap)) {
      return (
        <g className="bus-traffic-container">
          <RoadContainer busStopLocationMap={this.props.busStopLocationsMap} stops={this.props.stops} />
          {this.renderBusStops(this.props.busStopLocationsMap)}
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
}

export default BusTrafficContainer;
