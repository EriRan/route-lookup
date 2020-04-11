import React from "react";

class BusStop extends React.Component {
  render() {
    return (
      <svg width="50" height="50">
        <g>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="yellow"
            stroke="black"
            strokeWidth="2"
          >
          </circle>
          <text
              x="51%"
              y="57%"
              className="heavy"
              textAnchor="middle"
              stroke="black"
            >
              {this.props.name}
            </text>
        </g>
      </svg>
    );
  }
}

export default BusStop;
