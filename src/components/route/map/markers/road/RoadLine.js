import React from "react";

import RoadLineDuration from "./RoadLineDuration";
import RoadStyleDeducer from "./RoadStyleDeducer";
import { LINE_GAP } from "./RoadConstant";

class RoadLine extends React.Component {
  render() {
    return (
      <g className="road-line">
        {this.renderLines(
          this.props.startPointLocation,
          this.props.endPointLocation,
          this.props.roadData,
          this.props.calculatedRouteNode,
          this.props.isRouteCalculated
        )}
        <RoadLineDuration
          startPointLocation={this.props.startPointLocation}
          endPointLocation={this.props.endPointLocation}
          duration={this.props.roadData.duration}
        />
      </g>
    );
  }

  renderLines(
    startPointLocation,
    endPoint,
    roadData,
    calculatedRouteNode,
    isRouteCalculated
  ) {
    const styleObjects = new RoadStyleDeducer().deduce(
      roadData.includesLines,
      calculatedRouteNode,
      isRouteCalculated
    );
    const linesToRender = [];
    for (let i = 0; i < styleObjects.length; i++) {
      linesToRender.push(
        this.renderOneLine(
          startPointLocation,
          endPoint,
          roadData,
          styleObjects[i],
          i
        )
      );
    }
    return linesToRender;
  }

  /**
   * If there are multiple lines, draw each one LINE_GAP amount from each other.
   *
   * The direction where the next line is placed to depends on which direction the line is going: If the line is horizontal,
   * we must draw the next one below it and not next to it so the lines do not overlap.
   */
  renderOneLine(startPointLocation, endPoint, roadData, styleObject, index) {
    if (this.isLineHorizontal(startPointLocation.x, endPoint.x)) {
      return (
        <line
          key={`line-${roadData.from.name}-${roadData.to.name}-${styleObject.color}`}
          x1={startPointLocation.x}
          y1={startPointLocation.y + this.distanceFromOtherLine(index)}
          x2={endPoint.x}
          y2={endPoint.y + this.distanceFromOtherLine(index)}
          stroke={styleObject.color}
          opacity={styleObject.opacity}
        />
      );
    }
    return (
      <line
        key={`line-${roadData.from.name}-${roadData.to.name}-${styleObject.color}`}
        x1={startPointLocation.x + this.distanceFromOtherLine(index)}
        y1={startPointLocation.y}
        x2={endPoint.x + this.distanceFromOtherLine(index)}
        y2={endPoint.y}
        stroke={styleObject.color}
        opacity={styleObject.opacity}
      />
    );
  }

  distanceFromOtherLine(index) {
    return index * LINE_GAP;
  }

  isLineHorizontal(xOne, xTwo) {
    return xOne === xTwo;
  }
}

export default RoadLine;
