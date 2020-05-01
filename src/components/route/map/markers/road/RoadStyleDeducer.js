import { UNUSED_ROAD_OPACITY, UNUSED_ROAD_OPACITY_YELLOW, USED_ROAD_OPACITY } from "./RoadConstant";
import { isUndefinedOrNull } from "../../../../../util/Utilities";
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
      return new Array(this.createResponse("black", UNUSED_ROAD_OPACITY));
    }
    return this.deduceFromLines(
      includesLines,
      calculatedRouteNode,
      isRouteCalculated
    );
  }

  deduceFromLines(includesLines, calculatedRouteNode, isRouteCalculated) {
    const arrayResponse = [];
    includesLines.forEach((singleLine) => {
      arrayResponse.push(
        this.deduceOneLineStyle(
          singleLine,
          calculatedRouteNode,
          isRouteCalculated
        )
      );
    });
    return arrayResponse;
  }

  deduceOneLineStyle(colorString, calculatedRouteNode, isRouteCalculated) {
    return this.returnColorDependingOnLine(
      colorString,
      this.deduceCorrectOpacity(
        colorString,
        calculatedRouteNode,
        isRouteCalculated
      )
    );
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

  deduceCorrectOpacity(colorString, calculatedRouteNode, isRouteCalculated) {
    if (isRouteCalculated) {
      if (
        !isUndefinedOrNull(calculatedRouteNode) &&
        calculatedRouteNode.line === colorString
      ) {
        return USED_ROAD_OPACITY;
      } else {
        return this.deduceUnusedRoadOpacity(colorString);
      }
    } else {
      return USED_ROAD_OPACITY;
    }
  }

  deduceUnusedRoadOpacity(colorString) {
    if (colorString === "keltainen") {
      return UNUSED_ROAD_OPACITY_YELLOW;
    } else {
      return UNUSED_ROAD_OPACITY;
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
