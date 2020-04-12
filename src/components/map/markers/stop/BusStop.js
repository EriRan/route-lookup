import React from "react";

import "./BusStop.css";

class BusStop extends React.Component {
  render() {
    return (
      <svg x={this.props.location.x} y={this.props.location.y} width="50" height="50">
        <g>
          <circle cx="25" cy="25" r="20"></circle>
          <text x="51%" y="57%" className="heavy">
            {this.props.name}
          </text>
        </g>
      </svg>
    );
  }
}

export default BusStop;
