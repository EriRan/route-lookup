import React from "react";

class RoadLine extends React.Component {
  render() {
    return (
      <g className="road-line">
        <text>{this.props.roadData.duration}</text>
        {this.renderLine(
          this.props.startPointLocation,
          this.props.endPointLocation
        )}
      </g>
    );
  }

  renderLine(startPointLocation, endPoint) {
    return (
      <line
        x1={startPointLocation.x}
        y1={startPointLocation.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke="black"
      />
    );
  }
}

export default RoadLine;
