import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import BusStopContainer from "./stop/BusStopContainer";
import "./BusTrafficContainer.css";

class BusTrafficContainer extends React.Component {
  render() {
    return (
      <div>{this.renderTrafficNetwork()}</div>
    );
  }

  renderTrafficNetwork() {
    if (!_.isUndefined(this.props.stops) && !_.isNull(this.props.stops)) {
      const firstStopLocation = {
        x: 500,
        y: 500,
      };
      return (
        <BusStopContainer
          key={`stopContainer-${this.props.stops[0].name}`}
          stopData={this.props.stops[0]}
          renderedStops={new Map()}
          location={firstStopLocation}
        />
      );
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
