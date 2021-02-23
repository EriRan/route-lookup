/**
 * Creates objects for stops that contain variables that Djikstra's algorithm ran in RouteCalculator needs.
 */
class NodeFactory {
  build(stopData) {
    return {
      stopData: stopData,
      totalDuration: Infinity,
      nodeDuration: null,
      lineBeingUsed: null,
      shortestPath: [],
    };
  }

  buildAdjacent(stopData, duration) {
    return {
      stopData: stopData,
      totalDuration: Infinity,
      nodeDuration: duration,
      lineBeingUsed: null,
      shortestPath: [],
    };
  }

  buildStartNode(stopData) {
    return {
      stopData: stopData,
      totalDuration: 0,
      nodeDuration: null,
      lineBeingUsed: null,
      shortestPath: [],
    };
  }
}

export default NodeFactory;
