import React from "react";

import "./BusStop.css";

class BusStop extends React.Component {
  render() {
    return (
      <g className = "bus-stop">
        <circle cx={this.props.location.x} cy={this.props.location.y} r="20"></circle>
        <text x={this.props.location.x} y={this.props.location.y} className="heavy">
          {this.props.name}
        </text>
      </g>
    );
  }
}

export default BusStop;
