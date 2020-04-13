import React from "react";
import _ from "lodash";

import BusStopContainer from "../stop/BusStopContainer";
import RoadLine from "./RoadLine";
import { provideDirection } from "./RoadDirectionProvider";
import { RIGHT, DOWN, LEFT, UP } from "./RoadDirection";
import { STOP_GAP } from "./RoadConstant";

class Road extends React.Component {
  render() {
    console.log(
      "Rendering ",
      this.props.roadData.to.name,
      this.props.roadData.from.name,
      " Existing stop: ",
      this.props.alreadyRenderedStop
    );
    const endPoint = this.calculateLineEndLocation(
      this.props.startPointLocation,
      this.props.alreadyRenderedStop,
      this.props.directionIndex
    );
    return (
      <g className="road">
        <RoadLine
          roadData={this.props.roadData}
          startPointLocation={this.props.startPointLocation}
          endPointLocation={endPoint}
        />
        {this.renderDestinationBusStop(
          this.props.roadData,
          endPoint,
          this.props.renderedStops
        )}
      </g>
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

  calculateLineEndLocation(
    startPointLocation,
    alreadyRenderedStop,
    directionIndex
  ) {
    if (!_.isUndefined(alreadyRenderedStop) && !_.isNull(alreadyRenderedStop)) {
      //Line will be done to an already rendered station
      return alreadyRenderedStop;
    } else {
      return this.calculateNewLineEndLocation(
        startPointLocation,
        directionIndex
      );
    }
  }

  calculateNewLineEndLocation(startPointLocation, directionIndex) {
    //Weak point here: if a station has more than 4 roads, we won't be able to render a road to it.
    //Could add the diagonals to allow for 8 more directions but after that we would have to make lines make turns.
    switch (provideDirection(directionIndex)) {
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
