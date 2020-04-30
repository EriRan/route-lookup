import NodeFactory from "./NodeFactory";
import ResponseConverter from "./ResponseConverter";

import { isUndefinedOrNull } from "../../../util/Utilities";

/**
 * Calculates the shortest path from start point to the destionation using adapted Dijikstra's algorithm.
 */
class RouteCalculator {
  constructor(transportData) {
    this.transportData = transportData;
    this.nodeFactory = new NodeFactory();
  }

  calculate(startStop, destinationStop) {
    if (startStop === destinationStop) {
      return new ResponseConverter().emptyResponse();
    }
    const settledNodeNames = [];
    const unsettledNodeNames = [];
    const allNodesMap = this.createAllNodesStatusMap(this.transportData);
    allNodesMap.get(startStop).totalDuration = 0;
    unsettledNodeNames.push(startStop);
    while (unsettledNodeNames.length > 0) {
      const currentNode = this.findLowestDurationNode(
        unsettledNodeNames,
        allNodesMap
      );
      this.removeNode(currentNode, unsettledNodeNames);
      for (const road of currentNode.stopData.roads) {
        if (
          this.isRoadUsable(road) &&
          !settledNodeNames.includes(road.to.name)
        ) {
          const adjacentNode = allNodesMap.get(road.to.name);
          this.deduceWhichLineToUse(currentNode, road, adjacentNode);
          this.calculateMinimumDistance(
            currentNode,
            road.duration,
            adjacentNode
          );
          unsettledNodeNames.push(adjacentNode.stopData.name);
        }
      }
      settledNodeNames.push(currentNode.stopData.name);
    }

    return new ResponseConverter().convert(
      startStop,
      allNodesMap.get(destinationStop).shortestPath
    );
  }

  createAllNodesStatusMap(transportData) {
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

  getOtherNodes(startStop, stops) {
    const otherNodes = [];
    stops.forEach((stop) => {
      if (stop.name !== startStop) {
        otherNodes.push(this.nodeFactory.build(stop.name));
      }
    });
    return otherNodes;
  }

  findLowestDurationNode(unsettledNodeNames, allNodesMap) {
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

  deduceWhichLineToUse(currentNode, road, adjacentNode) {
    if (currentNode.lineBeingUsed === null) {
      currentNode.lineBeingUsed = road.includesLines[0];
      adjacentNode.lineBeingUsed = road.includesLines[0];
    } else {
      //Try to use currentNode's line if it is available
      if (this.canUseSameLine(road, currentNode)) {
        adjacentNode.lineBeingUsed = currentNode.lineBeingUsed;
      } else {
        //This part could use optimization if we had a view in future:
        //Which line takes us furthest to our destination so that we
        //have to do the least amount of transfers to different lines.
        adjacentNode.lineBeingUsed = road.includesLines[0];
      }
    }
  }

  calculateMinimumDistance(currentNode, durationBetweenNodes, adjacentNode) {
    if (
      adjacentNode.totalDuration === null ||
      currentNode.totalDuration + durationBetweenNodes <
        adjacentNode.totalDuration
    ) {
      adjacentNode.totalDuration =
        currentNode.totalDuration + durationBetweenNodes;
      //Copy the shortest path from the current so that we do not modify existing shortest path
      const shortestPath = currentNode.shortestPath.slice();
      shortestPath.push(adjacentNode);
      adjacentNode.shortestPath = shortestPath;
    }
  }

  isRoadUsable(road) {
    return (
      !isUndefinedOrNull(road) &&
      !isUndefinedOrNull(road.includesLines) &&
      road.includesLines.length !== 0
    );
  }

  canUseSameLine(road, currentNode) {
    return road.includesLines.some(
      (line) => line === currentNode.lineBeingUsed
    );
  }

  removeNode(nodeToRemove, nodeNames) {
    nodeNames.splice(nodeNames.indexOf(nodeToRemove.stopData.name), 1);
  }
}

export default RouteCalculator;
