import NodeFactory from "./NodeFactory";
import ResponseConverter from "./ResponseConverter";

import { isUndefinedOrNull } from "../../../../../util/Utilities";

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
      return "Olet jo määränpäässäsi.";
    }
    const settledNodes = new Map();
    const unsettledNodes = new Map();
    const startNode = this.nodeFactory.buildStartNode(
      this.transportData.stops.get(startStop)
    );
    unsettledNodes.set(startNode.stopData.name, startNode);
    while (unsettledNodes.size > 0) {
      const currentNode = this.findLowestDurationNode(unsettledNodes);
      this.removeNode(currentNode, unsettledNodes);
      for (const adjacentNode of this.deduceAdjacentNodes(currentNode)) {
        if (!settledNodes.has(adjacentNode.stopData.name)) {
          this.calculateMinimumDistance(adjacentNode, currentNode);
          unsettledNodes.set(adjacentNode.stopData.name, adjacentNode);
        }
      }
      settledNodes.set(currentNode.stopData.name, currentNode);
    }
    console.log(settledNodes);
    console.log(settledNodes.get(destinationStop).shortestPath);

    return new ResponseConverter().convert(settledNodes.get(destinationStop).shortestPath);
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

  findLowestDurationNode(unsettledNodes) {
    var lowestDurationNode = null;
    var lowestDuration = Infinity;
    Array.from(unsettledNodes.values()).forEach((unsettledNode) => {
      const nodeDuration = unsettledNode.totalDuration;
      if (nodeDuration < lowestDuration) {
        lowestDuration = nodeDuration;
        lowestDurationNode = unsettledNode;
      }
    });
    return lowestDurationNode;
  }

  deduceAdjacentNodes(currentNode) {
    const nodeStopData = this.transportData.stops.get(
      currentNode.stopData.name
    );
    if (isUndefinedOrNull(nodeStopData)) {
      console.log(
        "No data found for: ",
        currentNode.stopData.name,
        " unable to get adjecent nodes"
      );
      return [];
    }
    const adjacentNodes = [];
    nodeStopData.roads.forEach((road) => {
      this.addAdjacentNode(road, currentNode, adjacentNodes);
    });
    return adjacentNodes;
  }

  addAdjacentNode(road, currentNode, adjacentNodes) {
    //If stop does not belong to any lines, it cannot be used
    if (
      isUndefinedOrNull(road) ||
      isUndefinedOrNull(road.includesLines) ||
      road.includesLines.length === 0
    ) {
      return;
    }
    const adjacentNode = this.nodeFactory.buildAdjacent(road.to, road.duration);
    //Which line to use
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
    adjacentNodes.push(adjacentNode);
  }

  calculateMinimumDistance(adjacentNode, currentNode) {
    if (
      adjacentNode.totalDuration === null ||
      currentNode.totalDuration + adjacentNode.nodeDuration <
        adjacentNode.totalDuration
    ) {
      adjacentNode.totalDuration =
        currentNode.totalDuration + adjacentNode.nodeDuration;
      //Copy the shortest path from the current so that we do not modify existing shortest path
      const shortestPath = currentNode.shortestPath.slice();
      shortestPath.push(adjacentNode);
      adjacentNode.shortestPath = shortestPath;
    }
  }

  canUseSameLine(road, currentNode) {
    return road.includesLines.some(
      (line) => line === currentNode.lineBeingUsed
    );
  }

  removeNode(nodeToRemove, nodesMap) {
    nodesMap.delete(nodeToRemove.stopData.name);
  }
}

export default RouteCalculator;
