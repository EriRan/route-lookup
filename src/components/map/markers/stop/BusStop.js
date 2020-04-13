import React from "react";

import "./BusStop.css";

class BusStop extends React.Component {
  render() {
    return (
      <g className = "bus-stop">
        <circle cx={this.props.x} cy={this.props.y} r="20"></circle>
        <text x={this.props.x} y={this.props.y + 5} className="heavy">
          {this.props.name}
        </text>
      </g>
    );
  }
}

export default BusStop;
