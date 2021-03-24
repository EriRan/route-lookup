import _ from "lodash";

import { convertCalculation, createErrorResponse } from "./responseConverter";
import { ALREADY_AT_DESTINATION } from "./ErrorMessageConstant";

import { isUndefinedOrNull } from "../../../../util/Utilities";

/**
 * Calculates the shortest path from start point to the destionation using adapted Dijikstra's algorithm.
 */
class RouteCalculator {
  constructor(transportData) {
    this.transportData = transportData;
  }

  calculate(startStop, destinationStop) {
    if (startStop === destinationStop) {
      return createErrorResponse(ALREADY_AT_DESTINATION);
    }
    const settledNodeNames = [];
    const unsettledNodeNames = [];
    const allNodesMap = createAllNodesStatusMap(this.transportData);
    allNodesMap.get(startStop).totalDuration = 0;
    unsettledNodeNames.push(startStop);
    while (unsettledNodeNames.length > 0) {
      const currentNode = findLowestDurationNode(
        unsettledNodeNames,
        allNodesMap
      );
      removeNode(currentNode, unsettledNodeNames);
      for (const road of currentNode.stopData.roads) {
        if (isRoadUsable(road) && !settledNodeNames.includes(road.to.name)) {
          const adjacentNode = allNodesMap.get(road.to.name);
          calculateNodeVariables(currentNode, road, adjacentNode);
          unsettledNodeNames.push(adjacentNode.stopData.name);
        }
      }
      settledNodeNames.push(currentNode.stopData.name);
    }

    return convertCalculation(
      startStop,
      allNodesMap.get(destinationStop).shortestPath
    );
  }
}

function createAllNodesStatusMap(transportData) {
  const allNodesMap = new Map();
  transportData.stops.forEach((stopData, stopName) => {
    allNodesMap.set(stopName, {
      stopData: stopData,
      totalDuration: Infinity,
      lineBeingUsed: null,
      shortestPath: [],
    });
  });
  return allNodesMap;
}

function findLowestDurationNode(unsettledNodeNames, allNodesMap) {
  var lowestDurationNode = null;
  var lowestDuration = Infinity;
  unsettledNodeNames.forEach((unsettledNode) => {
    const unsettledNodeStatus = allNodesMap.get(unsettledNode);
    const nodeDuration = unsettledNodeStatus.totalDuration;
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
function calculateNodeVariables(currentNode, road, adjacentNode) {
  if (
    _.isNull(adjacentNode.totalDuration) ||
    currentNode.totalDuration + road.duration < adjacentNode.totalDuration
  ) {
    adjacentNode.totalDuration = currentNode.totalDuration + road.duration;
    //Copy the shortest path from the current so that we do not modify existing shortest path
    const shortestPath = currentNode.shortestPath.slice();
    shortestPath.push(adjacentNode);
    adjacentNode.shortestPath = shortestPath;
    deduceWhichLineToUse(currentNode, road, adjacentNode);
  }
}

function deduceWhichLineToUse(currentNode, road, adjacentNode) {
  if (_.isNull(currentNode.lineBeingUsed)) {
    adjacentNode.lineBeingUsed = road.includesLines[0];
  } else {
    //Try to use currentNode's line if it is available
    if (canUseSameLine(road, currentNode)) {
      adjacentNode.lineBeingUsed = currentNode.lineBeingUsed;
    } else {
      //This part could use optimization if we had a view in future:
      //Which line takes us furthest to our destination so that we
      //have to do the least amount of transfers to different lines.
      adjacentNode.lineBeingUsed = road.includesLines[0];
    }
  }
}

function isRoadUsable(road) {
  return (
    !isUndefinedOrNull(road) &&
    !isUndefinedOrNull(road.includesLines) &&
    road.includesLines.length !== 0
  );
}

function canUseSameLine(road, currentNode) {
  return road.includesLines.some((line) => line === currentNode.lineBeingUsed);
}

function removeNode(nodeToRemove, nodeNames) {
  nodeNames.splice(nodeNames.indexOf(nodeToRemove.stopData.name), 1);
}

export default RouteCalculator;
