import React from "react";
import { connect } from "react-redux";

import { stopClicked } from "../../../../actions";
import { SELECTED_COLOR } from "./BusStopConstant";
import "./BusStop.css";

class BusStop extends React.Component {
  render() {
    return (
      <g
        className="bus-stop"
        onClick={this.handleClick.bind(this, this.props.name)}
      >
        <circle
          cx={this.props.x}
          cy={this.props.y}
          r="20"
          stroke={this.deduceStrokeColor(
            this.props.name,
            this.props.startStop,
            this.props.destinationStop
          )}
        ></circle>
        <text x={this.props.x} y={this.props.y + 5} className="heavy">
          {this.props.name}
        </text>
      </g>
    );
  }

  deduceStrokeColor(currentStopName, startStop, destinationStop) {
    if (
      currentStopName === startStop.name ||
      currentStopName === destinationStop.name
    ) {
      return SELECTED_COLOR;
    }
    return "black";
  }

  handleClick(stopName, event) {
    this.props.stopClicked(stopName);
  }
}

const mapStateToProps = (state) => {
  return {
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

export default connect(mapStateToProps, { stopClicked })(BusStop);
