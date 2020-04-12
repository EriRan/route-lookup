import React from "react";

import Road from "./Road";

class RoadContainer extends React.Component {
  render() {
    return (
      <g className="road-container">
        {this.props.stopData.roads
          .filter((road) => {
            return road.isReverse === false;
          })
          .map((road, index) => {
            return (
              <Road
                key={`road-${road.to.name}-${road.from.name}`}
                roadData={road}
                renderedStops={this.props.renderedStops}
                startPointLocation={this.props.startPointLocation}
                directionIndex={index}
              />
            );
          })}
      </g>
    );
  }
}

export default RoadContainer;