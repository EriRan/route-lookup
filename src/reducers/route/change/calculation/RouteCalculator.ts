import _ from "lodash";

import { convertCalculation, createErrorResponse } from "./responseConverter";
import {
  ALREADY_AT_DESTINATION,
  ERROR_DURING_ROUTE_SEARCH,
} from "./ErrorMessageConstant";

import { isUndefinedOrNull } from "../../../../util/Utilities";
import { Road, TransportData } from "../../../../data/mapper/types";
import { CalculationResponse, RouteNode } from "./types";

/**
 * Calculates the shortest path from start point to the destionation using adapted Dijikstra's algorithm.
 *
 * Todo: Could use some time on the cutting board
 */
class RouteCalculator {
  private transportData: TransportData;

  constructor(transportData: TransportData) {
    this.transportData = transportData;
  }

  calculate(startStop: String, destinationStop: String): CalculationResponse {
    if (startStop === destinationStop) {
      return createErrorResponse(ALREADY_AT_DESTINATION);
    }
    const allNodesMap: Map<String, RouteNode> = createAllNodesStatusMap(
      this.transportData
    );
    if (!allNodesMap.get(startStop)) {
      console.error("Unknown startStop inputted to algorithm: " + startStop);
      return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
    }
    if (!allNodesMap.get(destinationStop)) {
      console.error(
        "Unknown destination stop inputted to algorithm: " + destinationStop
      );
      return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
    }
    const settledNodeNames: Array<String> = [];
    const unsettledNodeNames: Array<String> = [];

    allNodesMap.get(startStop)!.nodeDuration = 0;
    unsettledNodeNames.push(startStop);
    while (unsettledNodeNames.length > 0) {
      const currentNode = findLowestDurationNode(
        unsettledNodeNames,
        allNodesMap
      );
      if (!currentNode) {
        //Error scenario when lowest duration node is not found for some reason
        return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
      }
      //Remove a node from the unsettled ones
      removeNode(currentNode.stopData.name, unsettledNodeNames);

      //Traverse all roads that are connected for the current node
      for (const road of currentNode.stopData.roads) {
        if (
          doAnyLinesRunOnRoad(road) &&
          !settledNodeNames.includes(road.to.name)
        ) {
          const adjacentNode = allNodesMap.get(road.to.name);
          if (!adjacentNode) {
            //Error scenario when lowest duration node is not found for some reason
            console.error(
              "Adjacent node does not exist. Node was: " + road.to.name
            );
            return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
          }
          calculateNodeVariables(currentNode, road, adjacentNode);
          unsettledNodeNames.push(adjacentNode.stopData.name);
        }
      }
      settledNodeNames.push(currentNode.stopData.name);
    }

    return convertCalculation(
      startStop,
      allNodesMap.get(destinationStop)!.shortestPath
    );
  }
}

function createAllNodesStatusMap(transportData: TransportData) {
  const allNodesMap = new Map<String, RouteNode>();
  transportData.stops.forEach((stopData, stopName) => {
    allNodesMap.set(stopName, {
      stopData: stopData,
      nodeDuration: Infinity,
      lineBeingUsed: null,
      shortestPath: [],
    });
  });
  return allNodesMap;
}

function findLowestDurationNode(
  unsettledNodeNames: Array<String>,
  allNodesMap: Map<String, RouteNode>
): RouteNode | null {
  let lowestDurationNode = null;
  let lowestDuration = Infinity;
  unsettledNodeNames.forEach((unsettledNode) => {
    const unsettledNodeStatus = allNodesMap.get(unsettledNode);
    if (!unsettledNodeStatus) {
      console.error("Unable to find node for: " + unsettledNode);
      return null;
    }
    const nodeDuration = unsettledNodeStatus!.nodeDuration;
    if (nodeDuration < lowestDuration) {
      lowestDuration = nodeDuration;
      lowestDurationNode = unsettledNodeStatus;
    }
  });
  return lowestDurationNode;
}

/**
 * Calculate whether the path from current to adjacent is the fastest available and if so,
 * add the path to the node and which line to use to the adjacent node's variables
 */
function calculateNodeVariables(
  currentNode: RouteNode,
  road: Road,
  adjacentNode: RouteNode
) {
  if (
    _.isNull(adjacentNode.nodeDuration) ||
    currentNode.nodeDuration + road.duration < adjacentNode.nodeDuration
  ) {
    adjacentNode.nodeDuration = currentNode.nodeDuration + road.duration;
    //Copy the shortest path from the current so that we do not modify existing shortest path
    const shortestPath = currentNode.shortestPath.slice();
    shortestPath.push(adjacentNode);
    adjacentNode.shortestPath = shortestPath;
    if (_.isUndefined(road.includesLines)) {
      console.error(
        "Current road has no included lines! This was encountered on stop: " +
          currentNode.stopData.name
      );
      //Todo: Stop the run here
    }
    deduceWhichLineToUse(currentNode, road, adjacentNode);
  }
}

function deduceWhichLineToUse(
  currentNode: RouteNode,
  road: Road,
  adjacentNode: RouteNode
) {
  if (_.isNull(currentNode.lineBeingUsed)) {
    adjacentNode.lineBeingUsed = road.includesLines![0];
  } else {
    //Try to use currentNode's line if it is available so that we keep avoid unnecessary transfers
    if (canUseSameLine(road, currentNode)) {
      adjacentNode.lineBeingUsed = currentNode.lineBeingUsed;
    } else {
      //This part could use optimization:
      //Which line takes us furthest to our destination so that we
      //have to do the least amount of transfers to different lines.
      adjacentNode.lineBeingUsed = road.includesLines![0];
    }
  }
}

function doAnyLinesRunOnRoad(road: Road) {
  return (
    !isUndefinedOrNull(road) &&
    !isUndefinedOrNull(road.includesLines) &&
    road.includesLines!.length !== 0
  );
}

function canUseSameLine(road: Road, currentNode: RouteNode) {
  return (
    !isUndefinedOrNull(road) &&
    !isUndefinedOrNull(road.includesLines) &&
    road.includesLines!.some((line) => line === currentNode.lineBeingUsed)
  );
}

/**
 * Remove a node from node names
 * @param nodeNameToRemove
 * @param nodeNames
 */
function removeNode(nodeNameToRemove: String, nodeNames: Array<String>) {
  nodeNames.splice(nodeNames.indexOf(nodeNameToRemove), 1);
}

export default RouteCalculator;
