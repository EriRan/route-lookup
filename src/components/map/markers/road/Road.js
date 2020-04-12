import React from "react";

import BusStopContainer from "../stop/BusStopContainer";
import { provideDirection } from "./RoadDirectionProvider";
import { RIGHT, DOWN, LEFT, UP } from "./RoadDirection";

class Road extends React.Component {
  render() {
    const endPoint = this.deduceEndPoint(
      this.props.startPointLocation,
      provideDirection(this.props.directionIndex)
    );
    return (
      <g className="road">
        {this.renderRoadLine(
          this.props.data,
          this.props.startPointLocation,
          endPoint
        )}
        {this.renderDestinationBusStop(
          this.props.data,
          endPoint,
          this.props.renderedStops
        )}
      </g>
    );
  }

  renderRoadLine(data, startPointLocation, endPoint) {
    return (
      <g className="road-line">
        <text>{data.duration}</text>
        {this.renderLine(startPointLocation, endPoint)}
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

  renderDestinationBusStop(data, location, renderedStops) {
    return (
      <BusStopContainer
        key={`stopContainer-${data.to.name}`}
        stopData={data.to}
        renderedStops={renderedStops}
        location={location}
      />
    );
  }

  deduceEndPoint(startPointLocation, direction) {
    switch (direction) {
      case RIGHT:
        return {
          x: startPointLocation.x + 50,
          y: startPointLocation.y,
        };
      case DOWN:
        return {
          x: startPointLocation.x,
          y: startPointLocation.y + 50,
        };
      case LEFT:
        return {
          x: startPointLocation.x - 50,
          y: startPointLocation.y,
        };
      case UP:
        return {
          x: startPointLocation.x,
          y: startPointLocation.y - 50,
        };
      default:
        console.log(
          "Unknown direction encountered! Returning crazy direction so that this is not ignored!"
        );
        return {
          x: 0,
          y: 0,
        };
    }
  }
}

export default Road;
