import React from "react";

class Road extends React.Component {
  render() {
    return (
      <svg>
        <line
          x1={this.props.pointOne.x}
          y1={this.props.pointOne.y}
          x2={this.props.pointTwo.x}
          y2={this.props.pointTwo.y}
          stroke="black"
        />
      </svg>
    );
  }
}

export default Road;
