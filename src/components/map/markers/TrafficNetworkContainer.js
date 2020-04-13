import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import BusStop from "./stop/BusStop";
import BusStopLocationProvider from "./stop/BusStopLocationProvider";
import "./TrafficNetworkContainer.css";

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
      return Array.from(busStopLocationsMap.entries()).map((entry) => {
        return (
          <BusStop
            key={`stop-${entry[0]}`}
            name={entry[0]}
            x={entry[1].x}
            y={entry[1].y}
          />
        );
      });
    } else {
      return "Loading bus stops...";
    }
  }
}

const mapStateToProps = (state) => {
  return {
    //Needed in future
  };
};

export default connect(mapStateToProps, {})(BusTrafficContainer);
