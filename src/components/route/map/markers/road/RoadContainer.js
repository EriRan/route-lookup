import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { isUndefinedOrNull } from "../../../../../util/Utilities";

import RoadLine from "./RoadLine";

class RoadContainer extends React.Component {
  render() {
    return (
      <g>
        {Array.from(this.props.stops.values())
          .flatMap((stop) => stop.roads)
          .filter((road) => {
            return road.isReverse === false;
          })
          .map((road) => {
            return this.renderRoad(
              road,
              this.props.busStopLocationMap,
              this.props.calculatedRoute
            );
          })}
        )}
      </g>
    );
  }

  renderRoad(road, busStopLocationMap, calculatedRoute) {
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
    if (_.isMap(calculatedRoute) && calculatedRoute.length > 0) {
      const calculatedRouteNode = calculatedRoute.get(road.from.name + "-" + road.to.name);
      return (
        <RoadLine
          key={`road-line-from-${road.from.name}-to-${road.to.name}`}
          roadData={road}
          startPointLocation={startPointLocation}
          endPointLocation={endPointLocation}
          includesLines={road.includesLines}
          calculatedRouteNode={calculatedRouteNode}
          isRouteCalculated={true}
        />
      );
    }
    return (
      <RoadLine
        key={`road-line-from-${road.from.name}-to-${road.to.name}`}
        roadData={road}
        startPointLocation={startPointLocation}
        endPointLocation={endPointLocation}
        includesLines={road.includesLines}
        isRouteCalculated={false}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

export default connect(mapStateToProps, {})(RoadContainer);
