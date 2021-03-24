import _ from "lodash";
import { Road } from "../../../../data/mapper/types";

import { ROUTE_NOT_FOUND } from "./ErrorMessageConstant";
import {
  CalculationResponse,
  ResponseDirection,
  RouteKey,
  RouteNode,
} from "./types";

/**
 * Convert the response from calculator to a more compact format for the state and element rendering.
 *
 * Return {
 *  Integer totalDuration
 *  Map<String, StopData> - Key is made of the name of the start stop, a dash and the name of the destination stop. Eg. A-C
 *  String errorMessage
 * }
 */
export function convertCalculation(
  startStop: String,
  nodes: RouteNode[]
): CalculationResponse {
  if (nodes.length === 0) {
    return createErrorResponse(ROUTE_NOT_FOUND);
  }
  return {
    totalDuration: nodes[nodes.length - 1].nodeDuration,
    route: buildRoute(startStop, nodes),
    errorMessage: null,
  };

  function buildRoute(startStop: String, nodes: RouteNode[]) {
    const route = new Map();
    for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];
      if (i === 0) {
        route.set(
          createStartStopKey(startStop, currentNode),
          createOneDirection(
            startStop,
            currentNode.stopData.name,
            currentNode.lineBeingUsed,
            null
          )
        );
      } else {
        let previousNode = nodes[i - 1];
        route.set(
          createKey(previousNode, currentNode),
          createOneDirection(
            previousNode.stopData.name,
            currentNode.stopData.name,
            currentNode.lineBeingUsed,
            null
          )
        );
      }
    }
    return route;
  }

  function createStartStopKey(fromName: String, toNode: RouteNode) {
    return createKeyString(
      toNode.stopData.roads.find((road) => road.to.name === fromName)
    );
  }

  function createKey(fromNode: RouteNode, toNode: RouteNode): RouteKey | null {
    return createKeyString(
      toNode.stopData.roads.find(
        (road) => road.to.name === fromNode.stopData.name
      )
    );
  }

  /**
   * Create a key for the map which is made of the names of the two stops that the road goes between
   * and a dash between the names. If the road that was found between has flag isReverse, we flip the
   * two stop names around because reverse roads are not rendered
   */
  function createKeyString(roadBetween: Road | undefined): RouteKey | null {
    if (_.isUndefined(roadBetween)) {
      console.error("Unable to find route between two stops!");
      return null;
    } else {
      if (roadBetween.isReverse) {
        return roadBetween.to.name + "-" + roadBetween.from.name;
      } else {
        return roadBetween.from.name + "-" + roadBetween.to.name;
      }
    }
  }

  function createOneDirection(
    from: String,
    to: String,
    line: String | null, //Is not normally null except when the values provided are broken
    duration: number | null
  ): ResponseDirection {
    if (_.isNull(line)) {
      console.error(
        "Encountered null line when creating one direction for " +
          from +
          " to " +
          to
      );
    }
    return {
      from: from,
      to: to,
      line: line,
      duration: duration,
    };
  }
}
export function createErrorResponse(errorMessage: String): CalculationResponse {
  return {
    totalDuration: null,
    route: null,
    errorMessage: errorMessage,
  };
}
