import React from "react";
import { connect } from "react-redux";

import BusStop from "./BusStop";
import "./BusStopContainer.css";

class BusStopContainer extends React.Component {
  render() {
    return <div className="bus-stop-container">{this.renderBusStops()}</div>;
  }

  renderBusStops() {
    return this.props.stops.map((stop) => {
      return <BusStop key={`stop-${stop}`} name={stop} />;
    });
  }
}

const mapStateToProps = (state) => {
  return {
    stops: state.transportData.stops != null ? state.transportData.stops : [],
  };
};

export default connect(mapStateToProps, {})(BusStopContainer);
