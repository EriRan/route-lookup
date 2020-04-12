import React from "react";
import _ from "lodash";

import BusStop from "./BusStop";
import RoadContainer from "../road/RoadContainer";

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
        <g className="bus-stop-container">
          {this.renderBusStopElement(
            this.props.stopData,
            this.props.renderedStops,
            this.props.location
          )}
          <RoadContainer
            stopData={this.props.stopData}
            renderedStops={this.props.renderedStops}
            startPointLocation={this.props.location}
          />
        </g>
      );
    } else {
      return null;
    }
  }

  renderBusStopElement(stopData, renderedStops, location) {
    renderedStops.set(stopData.name, location);
    return (
      <BusStop
        key={`stop-${stopData.name}`}
        name={stopData.name}
        location={location}
      />
    );
  }
}

export default BusStopContainer;
