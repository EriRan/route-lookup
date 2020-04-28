import React from "react";
import RoadLineDuration from "./RoadLineDuration";
import RoadStyleDeducer from "./RoadStyleDeducer";

class RoadLine extends React.Component {
  render() {
    return (
      <g className="road-line">
        {this.renderLine(
          this.props.startPointLocation,
          this.props.endPointLocation,
          new RoadStyleDeducer().deduce(this.props.roadData.includesLines)
        )}
        <RoadLineDuration
          startPointLocation={this.props.startPointLocation}
          endPointLocation={this.props.endPointLocation}
          duration={this.props.roadData.duration}
        />
      </g>
    );
  }

  renderLine(startPointLocation, endPoint, styleObject) {
    return (
      <line
        x1={startPointLocation.x}
        y1={startPointLocation.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={styleObject.color}
        opacity={styleObject.opacity}
      />
    );
  }
}

export default RoadLine;
