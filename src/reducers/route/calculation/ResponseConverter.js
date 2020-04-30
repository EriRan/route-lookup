import _ from "lodash";

/**
 * Convert the response from calculator to a more compact format for state and element rendering.
 *
 * Return {
 *  Integer totalDuration
 *  Map<String, StopData> - Key is made of the name of the start stop, a dash and the name of the destination stop. Eg. A-C
 *  String message
 * }
 */
class ResponseConverter {
  convert(startStop, nodes) {
    if (nodes.length === 0) {
      return {
        totalDuration: null,
        route: null,
        message: "Reittiä ei löytynyt",
      };
    }
    return {
      totalDuration: nodes[nodes.length - 1].totalDuration,
      route: this.buildRoute(startStop, nodes),
      message: null,
    };
  }

  buildRoute(startStop, nodes) {
    const route = new Map();
    for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];
      if (i === 0) {
        route.set(
          this.createStartStopKey(startStop, currentNode),
          this.createOneDirection(
            startStop,
            currentNode.stopData.name,
            currentNode.lineBeingUsed,
            null
          )
        );
      } else {
        let previousNode = nodes[i - 1];
        route.set(
          this.createKey(previousNode, currentNode),
          this.createOneDirection(
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

  createStartStopKey(fromName, toNode) {
    return this.createKeyString(
      toNode.stopData.roads.find((route) => route.to.name === fromName)
    );
  }

  createKey(fromNode, toNode) {
    return this.createKeyString(
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
  createKeyString(roadBetween) {
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

  createOneDirection(to, from, line, duration) {
    return {
      to: to,
      from: from,
      line: line,
      duration: duration,
    };
  }

  emptyResponse() {
    return {
      totalDuration: 0,
      route: {},
    };
  }
}

export default ResponseConverter;
