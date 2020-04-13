import React from "react";
import _ from "lodash";

import Road from "./Road";

class RoadContainer extends React.Component {
  render() {
    const nextDirectionIndexContainer = { next: -1 };
    return (
      <g className="road-container">
        {this.props.stopData.roads
          .filter((road) => {
            return road.isReverse === false;
          })
          .map((road) => {
            return this.renderRoadsWithCorrectDirection(
              road,
              nextDirectionIndexContainer,
              this.props.renderedStops,
              this.props.startPointLocation
            );
          })}
      </g>
    );
  }

  renderRoadsWithCorrectDirection(
    road,
    nextDirectionIndexContainer,
    renderedStops,
    startPointLocation
  ) {
    const alreadyRenderedStop = renderedStops.get(road.to.name);
    if (!_.isUndefined(alreadyRenderedStop) && !_.isNull(alreadyRenderedStop)) {
      return (
        <Road
          key={`road-${road.to.name}-${road.from.name}`}
          roadData={road}
          renderedStops={renderedStops}
          startPointLocation={startPointLocation}
          alreadyRenderedStop={alreadyRenderedStop}
        />
      );
    } else {
      nextDirectionIndexContainer.next++;
      return (
        <Road
          key={`road-${road.to.name}-${road.from.name}`}
          roadData={road}
          renderedStops={renderedStops}
          startPointLocation={startPointLocation}
          directionIndex={nextDirectionIndexContainer.next}
        />
      );
    }
  }
}

export default RoadContainer;
