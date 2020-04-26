/**
 * Convert the nodes response from calculator to a more compact format for state and element rendering.
 */
class ResponseConverter {
  convert(nodes) {
    const route = nodes.map((node) => {
      return {
        name: node.stopData.name,
        line: node.lineBeingUsed,
        duration: node.nodeDuration,
      };
    });
    return {
      totalDuration: nodes[nodes.length - 1].totalDuration,
      route: route,
    };
  }
}

export default ResponseConverter;
