import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR
} from "./RoadConstant";
import { isUndefinedOrNull } from "../../../../util/Utilities";

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
export function provideStyles(
  includesLines,
  calculatedRouteNode,
  isRouteCalculated
) {
  if (!Array.isArray(includesLines) || includesLines.length === 0) {
    return new Array(createResponse(UNUSED_ROAD_COLOR, UNUSED_ROAD_OPACITY));
  }
  return deduceFromLines(includesLines, calculatedRouteNode, isRouteCalculated);

  function deduceFromLines(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  ) {
    const arrayResponse = [];
    includesLines.forEach((singleLine) => {
      arrayResponse.push(
        deduceOneLineStyle(singleLine, calculatedRouteNode, isRouteCalculated)
      );
    });
    return arrayResponse;
  }

  function deduceOneLineStyle(
    colorString,
    calculatedRouteNode,
    isRouteCalculated
  ) {
    return returnColorDependingOnLine(
      colorString,
      deduceCorrectOpacity(colorString, calculatedRouteNode, isRouteCalculated)
    );
  }
  function returnColorDependingOnLine(colorString, opacity) {
    switch (colorString) {
      case "Keltainen":
        return createResponse("yellow", opacity);
      case "Punainen":
        return createResponse("red", opacity);
      case "Vihreä":
        return createResponse("green", opacity);
      case "Sininen":
        return createResponse("blue", opacity);
      default:
        console.log(
          "Unrecognised line name: ",
          colorString,
          " Please define a color for it"
        );
        return createResponse(UNKNOWN_ROAD_COLOR, opacity);
    }
  }

  function deduceCorrectOpacity(
    colorString,
    calculatedRouteNode,
    isRouteCalculated
  ) {
    if (isRouteCalculated) {
      if (
        !isUndefinedOrNull(calculatedRouteNode) &&
        calculatedRouteNode.line === colorString
      ) {
        return USED_ROAD_OPACITY;
      } else {
        return deduceUnusedRoadOpacity(colorString);
      }
    } else {
      return USED_ROAD_OPACITY;
    }
  }

  function deduceUnusedRoadOpacity(colorString) {
    if (colorString === "Keltainen") {
      return UNUSED_ROAD_OPACITY_YELLOW;
    } else {
      return UNUSED_ROAD_OPACITY;
    }
  }

  function createResponse(colorString, opacity) {
    return {
      color: colorString,
      opacity: opacity,
    };
  }
}
