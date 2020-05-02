import _ from "lodash";

import { ROUTE_NOT_FOUND } from "./ErrorMessageConstant";

/**
 * Convert the response from calculator to a more compact format for state and element rendering.
 *
 * Return {
 *  Integer totalDuration
 *  Map<String, StopData> - Key is made of the name of the start stop, a dash and the name of the destination stop. Eg. A-C
 *  String errorMessage
 * }
 */
export function convertCalculation(startStop, nodes) {
  if (nodes.length === 0) {
    return createErrorResponse(ROUTE_NOT_FOUND);
  }
  return {
    totalDuration: nodes[nodes.length - 1].totalDuration,
    route: buildRoute(startStop, nodes),
    errorMessage: null,
  };

  function buildRoute(startStop, nodes) {
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

  function createStartStopKey(fromName, toNode) {
    return createKeyString(
      toNode.stopData.roads.find((route) => route.to.name === fromName)
    );
  }

  function createKey(fromNode, toNode) {
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
  function createKeyString(roadBetween) {
    if (_.isUndefined(roadBetween)) {
      console.log("Unable to find route between two stops!");
      return null;
    } else {
      if (roadBetween.isReverse) {
        return roadBetween.to.name + "-" + roadBetween.from.name;
      } else {
        return roadBetween.from.name + "-" + roadBetween.to.name;
      }
    }
  }

  function createOneDirection(from, to, line, duration) {
    return {
      from: from,
      to: to,
      line: line,
      duration: duration,
    };
  }
}
export function createErrorResponse(errorMessage) {
  return {
    totalDuration: null,
    route: null,
    errorMessage: errorMessage,
  };
}
