/**
 * Convert the nodes response from calculator to a more compact format for state and element rendering.
 *
 * Return Map<String, NodeInfo>
 *
 * Key is made of the name of the start stop, a dash and the name of the destination stop. Eg. A-C
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
          this.createKey(startStop, currentNode.stopData.name),
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
          this.createKey(previousNode.stopData.name, currentNode.stopData.name),
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

  createKey(from, to) {
    return from + "-" + to;
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
