import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR,
} from "./RoadConstant";
import { isUndefinedOrNull } from "../../../../util/Utilities";
import { ResponseDirection } from "../../../../reducers/route/change/calculation/types";
import { RoadStyle } from "./types";

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
  isRouteCalculated: boolean,
  calculatedRouteNode?: ResponseDirection,
  includesLines?: string[]
): Array<RoadStyle> {
  if (!Array.isArray(includesLines)) {
    console.error(
      "Received non array for included lines. Returning an unused road!"
    );
    return new Array(createResponse(UNUSED_ROAD_COLOR, UNUSED_ROAD_OPACITY));
  }
  if (includesLines.length === 0) {
    return new Array(createResponse(UNUSED_ROAD_COLOR, UNUSED_ROAD_OPACITY));
  }
  return deduceFromLines(isRouteCalculated, includesLines, calculatedRouteNode);

  function deduceFromLines(
    isRouteCalculated: boolean,
    includesLines: string[],
    calculatedRouteNode?: ResponseDirection
  ) {
    const arrayResponse = new Array<RoadStyle>();
    includesLines.forEach((singleLine) => {
      arrayResponse.push(
        deduceOneLineStyle(singleLine, isRouteCalculated, calculatedRouteNode)
      );
    });
    return arrayResponse;
  }

  function deduceOneLineStyle(
    colorString: string,
    isRouteCalculated: boolean,
    calculatedRouteNode?: ResponseDirection
  ) {
    return returnColorDependingOnLine(
      colorString,
      deduceCorrectOpacity(colorString, isRouteCalculated, calculatedRouteNode)
    );
  }
  function returnColorDependingOnLine(colorString: string, opacity: number) {
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
    colorString: string,
    isRouteCalculated: boolean,
    calculatedRouteNode?: ResponseDirection
  ): number {
    if (isRouteCalculated) {
      if (
        !isUndefinedOrNull(calculatedRouteNode) &&
        calculatedRouteNode!.line === colorString
      ) {
        return USED_ROAD_OPACITY;
      } else {
        return deduceUnusedRoadOpacity(colorString);
      }
    } else {
      return USED_ROAD_OPACITY;
    }
  }

  function deduceUnusedRoadOpacity(colorString: string) {
    if (colorString === "Keltainen") {
      return UNUSED_ROAD_OPACITY_YELLOW;
    } else {
      return UNUSED_ROAD_OPACITY;
    }
  }

  function createResponse(colorString: string, opacity: number) {
    return {
      color: colorString,
      opacity: opacity,
    };
  }
}
