import _ from "lodash";

/**
 * Compress results of the route calculation to smaller size by making stops point to the stop at which we must change line or the calculated route ends there.
 */
export function compressResponse(route) {
  const routes = Array.from(route.values());
  const compressedResponse = [];
  let currentLine = null;
  let currentLineStartStop = null;
  for (let i = 0; i < routes.length; i++) {
    let iteratedRoute = routes[i];
    let isFinal = isLastRoute(i, routes);
    if (_.isNull(currentLineStartStop)) {
      currentLine = iteratedRoute.line;
      currentLineStartStop = iteratedRoute.from;
    }
    if (isFinal) {
      addLastRoutes(iteratedRoute, currentLineStartStop, currentLine);
    } else if (_.isNull(currentLine) || currentLine !== iteratedRoute.line) {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.from,
          currentLine
        )
      );
      currentLine = iteratedRoute.line;
      currentLineStartStop = iteratedRoute.from;
    }
  }
  return compressedResponse;

  function addLastRoutes(iteratedRoute, currentLineStartStop, currentLine) {
    if (currentLine === iteratedRoute.line) {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.to,
          currentLine
        )
      );
    } else {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.from,
          currentLine
        )
      );
      compressedResponse.push(
        createCompressedNode(
          iteratedRoute.from,
          iteratedRoute.to,
          iteratedRoute.line
        )
      );
    }
  }

  function isLastRoute(i, routes) {
    return i === routes.length - 1;
  }

  function createCompressedNode(currentLineStart, currentLineEnd, currentLine) {
    return {
      from: currentLineStart,
      to: currentLineEnd,
      line: currentLine,
    };
  }
}
