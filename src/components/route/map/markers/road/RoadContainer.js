import React from "react";
import { isUndefinedOrNull } from "../../../../../util/Utilities";

import RoadLine from "./RoadLine";

class RoadContainer extends React.Component {
  render() {
    return (
      <g>
        {Array.from(this.props.stops.values()).map((stop) => {
          return stop.roads
            .filter((road) => {
              return road.isReverse === false;
            })
            .map((road) => {
              return this.renderRoad(road, this.props.busStopLocationMap);
            });
        })}
      </g>
    );
  }

  renderRoad(road, busStopLocationMap) {
    const startPointLocation = busStopLocationMap.get(road.from.name);
    const endPointLocation = busStopLocationMap.get(road.to.name);
    if (isUndefinedOrNull(startPointLocation)) {
      console.log(
        "Start point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    if (isUndefinedOrNull(endPointLocation)) {
      console.log(
        "End point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    return (
      <RoadLine
        key={`road-line-from-${road.from.name}-to-${road.to.name}`}
        roadData={road}
        startPointLocation={startPointLocation}
        endPointLocation={endPointLocation}
        includesLines={road.includesLines}
      />
    );
  }
}

export default RoadContainer;
