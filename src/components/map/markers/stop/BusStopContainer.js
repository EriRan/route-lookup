import React from "react";
import _ from "lodash";

import BusStop from "./BusStop";
import Road from "../road/Road";

/**
 * Renders the stop and the roads leaving from it. Roads that are copies from roads with just their destinations flipped around (reverse roads) are not rendered.
 */
class BusStopContainer extends React.Component {
  render() {
    const alreadyRenderedStop = this.props.renderedStops.get(
      this.props.stopData.name
    );
    if (_.isUndefined(alreadyRenderedStop) || _.isNull(alreadyRenderedStop)) {
      return (
        <div>
          {this.renderBusStopElement(
            this.props.stopData,
            this.props.renderedStops,
            this.props.location
          )}
          {this.renderRoads(
            this.props.stopData,
            this.props.renderedStops,
            this.props.location
          )}
        </div>
      );
    } else {
      return null;
    }
  }

  renderBusStopElement(stopData, renderedStops, location) {
    renderedStops.set(stopData.name, stopData);
    return (
      <BusStop
        key={`stop-${stopData.name}`}
        name={stopData.name}
        location={location}
      />
    );
  }

  renderRoads(stopData, renderedStops, startPointLocation) {
    return (
      <div>
        {stopData.roads
          .filter((road) => {
            return road.isReverse === false;
          })
          .map((road, index) => {
            return (
              <Road
                key={`road-${road.to.name}-${road.from.name}`}
                data={road}
                renderedStops={renderedStops}
                startPointLocation={startPointLocation}
                directionIndex={index}
              />
            );
          })}
      </div>
    );
  }
}

export default BusStopContainer;
