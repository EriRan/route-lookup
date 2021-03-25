import React from "react";
import { BusStopLocation } from "../../types";
import { RoadDurationProps } from "./types";

class RoadLineDuration extends React.Component<RoadDurationProps, {}> {
  /**
   * Render a duration number in the middle of a road line.
   */
  render() {
    const startPointLocation = this.props.startPointLocation;
    const endPointLocation = this.props.endPointLocation;
    if (!startPointLocation) {
      console.error(
        "Start point location missing! Unable to render road duration!"
      );
      return null;
    }
    if (!endPointLocation) {
      console.error(
        "End point location missing! Unable to render road duration!"
      );
      return null;
    }
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

  renderTextInMiddleHorizontal(
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    duration: number
  ) {
    return (
      <text
        x={startPointLocation.x}
        y={this.calculateMidpoint(startPointLocation.y, endPointLocation.y) + 5}
      >
        {duration}
      </text>
    );
  }

  renderTextInMiddleVertical(
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    duration: number
  ) {
    return (
      <text
        x={this.calculateMidpoint(startPointLocation.x, endPointLocation.x)}
        y={startPointLocation.y + 5}
      >
        {duration}
      </text>
    );
  }

  renderTextInMiddleDiagonal(
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    duration: number
  ) {
    return (
      <text
        x={this.calculateMidpoint(startPointLocation.x, endPointLocation.x)}
        y={this.calculateMidpoint(startPointLocation.y, endPointLocation.y) + 5}
      >
        {duration}
      </text>
    );
  }

  calculateMidpoint(startValue: number, endValue: number) {
    return (startValue + endValue) / 2;
  }
}

export default RoadLineDuration;
