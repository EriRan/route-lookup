import React from "react";

class RoadLineDuration extends React.Component {
  /**
   * Render the duration number in middle of the road line.
   */
  render() {
    const startPointLocation = this.props.startPointLocation;
    const endPointLocation = this.props.endPointLocation;
    if (startPointLocation.x === endPointLocation.x) {
      return this.renderTextInMiddleHorizontal(
        startPointLocation,
        endPointLocation,
        this.props.duration
      );
    } else if (startPointLocation.y === endPointLocation.y) {
      return this.renderTextInMiddleVertical(
        startPointLocation,
        endPointLocation,
        this.props.duration
      );
    } else {
      return this.renderTextInMiddleDiagonal(
        startPointLocation,
        endPointLocation,
        this.props.duration
      );
    }
  }

  renderTextInMiddleHorizontal(startPointLocation, endPointLocation, duration) {
    return (
      <text
        x={startPointLocation.x}
        y={this.calculateMidpoint(startPointLocation.y, endPointLocation.y)}
      >
        {duration}
      </text>
    );
  }

  renderTextInMiddleVertical(startPointLocation, endPointLocation, duration) {
    return (
      <text
        x={this.calculateMidpoint(startPointLocation.x, endPointLocation.x)}
        y={startPointLocation.y}
      >
        {duration}
      </text>
    );
  }

  renderTextInMiddleDiagonal(startPointLocation, endPointLocation, duration) {
    return (
      <text
        x={this.calculateMidpoint(startPointLocation.x, endPointLocation.x)}
        y={this.calculateMidpoint(startPointLocation.y, endPointLocation.y)}
      >
        {duration}
      </text>
    );
  }

  calculateMidpoint(startValue, endValue) {
    return (startValue + endValue) / 2;
  }
}

export default RoadLineDuration;
