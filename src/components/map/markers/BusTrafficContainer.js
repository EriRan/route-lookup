import React from "react";
import { connect } from "react-redux";

import BusStop from "./stop/BusStop";
import "./BusTrafficContainer.css";

class BusTrafficContainer extends React.Component {
  render() {
    return <div className="bus-stop-container">{this.renderBusStops()}</div>;
  }

  renderBusStops() {
    if (this.props.stops != null) {
      return this.props.stops.map((stop) => {
        return <BusStop key={`stop-${stop}`} name={stop} />;
      });
    } else {
      return "Loading bus stops..."
    }
  }
}

const mapStateToProps = (state) => {
  return {
    //Needed in future
  };
};

export default connect(mapStateToProps, {})(BusTrafficContainer);
