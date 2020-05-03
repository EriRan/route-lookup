import _ from "lodash";

/**
 * Compress results of the route calculation to smaller size by making stops point to the stop at which we must change line or the calculated route ends there.
 */
export function compressResponse(route) {
  const routes = Array.from(route.values());
  console.log(routes);
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
    if (
      _.isNull(currentLine) ||
      currentLine !== iteratedRoute.line ||
      isFinal
    ) {
      if (isFinal) {
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
      } else {
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
  }
  return compressedResponse;

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
