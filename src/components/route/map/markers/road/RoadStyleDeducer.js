import { UNUSED_ROAD_OPACITY, USED_ROAD_OPACITY } from "./RoadConstant";
/**
 * Deduces styles for roads. The more lines the road is included in, the more style objects will be provided.
 *
 * return Array<StyleObject>
 *
 * StyleObject : {
 *  Integer opacity
 *  String color
 * }
 */
class RoadStyleDeducer {
  deduce(includesLines, calculatedRouteNode, isRouteCalculated) {
    if (!Array.isArray(includesLines) || includesLines.length === 0) {
      return new Array(this.createResponse(UNUSED_ROAD_OPACITY, "gray"));
    }
    return this.deduceFromLines(
      includesLines,
      calculatedRouteNode,
      isRouteCalculated
    );
  }

  deduceFromLines(includesLines, calculatedRouteNode) {
    const arrayResponse = [];
    includesLines.forEach((singleLine) => {
      arrayResponse.push(
        this.deduceOneLineStyle(singleLine, calculatedRouteNode)
      );
    });
    return arrayResponse;
  }

  deduceOneLineStyle(colorString, calculatedRouteNode, isRouteCalculated) {
    if (isRouteCalculated) {
      if (calculatedRouteNode.line === colorString) {
        this.returnColorDependingOnLine(colorString, USED_ROAD_OPACITY);
      } else {
        this.returnColorDependingOnLine(colorString, UNUSED_ROAD_OPACITY);
      }
    } else {
      return this.returnColorDependingOnLine(colorString, USED_ROAD_OPACITY);
    }
  }

  returnColorDependingOnLine(colorString, opacity) {
    switch (colorString) {
      case "keltainen":
        return this.createResponse("yellow", opacity);
      case "punainen":
        return this.createResponse("red", opacity);
      case "vihreä":
        return this.createResponse("green", opacity);
      case "sininen":
        return this.createResponse("blue", opacity);
      default:
        console.log(
          "Unrecognised line name: ",
          colorString,
          " Please define a color for it"
        );
        return this.createResponse("black", opacity);
    }
  }

  createResponse(colorString, opacity) {
    return {
      color: colorString,
      opacity: opacity,
    };
  }
}

export default RoadStyleDeducer;
