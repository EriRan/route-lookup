import React from "react";
import { connect } from "react-redux";

import BusStop from "./BusStop";

class BusStopContainer extends React.Component {
  render() {
    return <div>{this.renderBusStops()}</div>;
  }

  renderBusStops() {
    return this.props.stops.map(stop => {
      return (
        <BusStop key={`stop-${stop}`} name={stop}/>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    stops: state.transportData.stops != null ? state.transportData.stops : [],
  };
};

export default connect(mapStateToProps, {})(BusStopContainer);
