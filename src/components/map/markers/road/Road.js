import React from "react";
import _ from "lodash";

import BusStopContainer from "../stop/BusStopContainer";
import { provideDirection } from "./RoadDirectionProvider";
import { RIGHT, DOWN, LEFT, UP } from "./RoadDirection";
import { STOP_GAP } from "./RoadConstant";

class Road extends React.Component {
  render() {
    const endPoint = this.calculateLineEndLocation(
      this.props.startPointLocation,
      this.props.renderedStops
    );
    return (
      <g className="road">
        {this.renderRoadLine(
          this.props.roadData,
          this.props.startPointLocation,
          endPoint
        )}
        {this.renderDestinationBusStop(
          this.props.roadData,
          endPoint,
          this.props.renderedStops
        )}
      </g>
    );
  }

  renderRoadLine(roadData, startPointLocation, endPoint) {
    return (
      <g className="road-line">
        <text>{roadData.duration}</text>
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

  renderDestinationBusStop(roadData, location, renderedStops) {
    return (
      <BusStopContainer
        key={`stopContainer-${roadData.to.name}`}
        stopData={roadData.to}
        renderedStops={renderedStops}
        location={location}
      />
    );
  }

  calculateLineEndLocation(startPointLocation, alreadyRenderedStops) {
    const alreadyRenderedStopLocation = alreadyRenderedStops.get(
      this.props.roadData.to.name
    );
    if (
      !_.isUndefined(alreadyRenderedStopLocation) &&
      !_.isNull(alreadyRenderedStopLocation)
    ) {
      //Line will be done to an already rendered station
      return alreadyRenderedStopLocation;
    } else {
      return this.calculateNewLineEndLocation(startPointLocation);
    }
  }

  calculateNewLineEndLocation(startPointLocation) {
    //Weak point here: if a station has more than 4 roads, we won't be able to render a road to it. 
    //Could add the diagonals to allow for 8 more directions but after that we would have to make lines make turns.
    switch (provideDirection(this.props.directionIndex)) {
      case RIGHT:
        return {
          x: startPointLocation.x + STOP_GAP,
          y: startPointLocation.y,
        };
      case DOWN:
        return {
          x: startPointLocation.x,
          y: startPointLocation.y + STOP_GAP,
        };
      case LEFT:
        return {
          x: startPointLocation.x - STOP_GAP,
          y: startPointLocation.y,
        };
      case UP:
        return {
          x: startPointLocation.x,
          y: startPointLocation.y - STOP_GAP,
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
