/**
 * Convert the nodes response from calculator to a more compact format for state and element rendering.
 */
class ResponseConverter {
  convert(startStop, nodes) {
    if (nodes.length === 0) {
      return {
        totalDuration: null,
        route: [],
        message: "Reittiä ei löytynyt",
      };
    }
    return {
      totalDuration: nodes[nodes.length - 1].totalDuration,
      route: this.buildRoute(startStop, nodes),
    };
  }

  buildRoute(startStop, nodes) {
    const route = [];
    for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];
      if (i === 0) {
        route.push(
          this.createOneDirection(
            startStop,
            currentNode.stopData.name,
            currentNode.lineBeingUsed,
            null
          )
        );
      } else {
        let previousNode = nodes[i - 1];
        route.push(
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

  createOneDirection(from, to, line, duration) {
    return {
      from: from,
      to: to,
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
