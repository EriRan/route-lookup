import _ from "lodash";
import { ResponseDirection } from "../../../../reducers/route/change/calculation/types";
import { UNKNOWN_LINE_TEXT } from "./CompressedRouteConstant";
import { CompressedRoute } from "./types";

/**
 * Compress results of the route calculation to smaller size by making stops point to the stop at which we must change line or the calculated route ends there.
 */
export function compressResponse(
  routes: Array<ResponseDirection>
): Array<CompressedRoute> {
  if (!_.isArray(routes)) {
    return [];
  }
  const compressedResponse = Array<CompressedRoute>();
  let currentLine: string | null = null;
  let currentLineStartStop: string | null = null;
  for (let i = 0; i < routes.length; i++) {
    let iteratedRoute: ResponseDirection = routes[i];
    let isLast = isLastRoute(i, routes);
    if (_.isNull(currentLineStartStop)) {
      currentLine = iteratedRoute.line;
      currentLineStartStop = iteratedRoute.from;
    }
    if (isLast) {
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

  function addLastRoutes(
    iteratedRoute: ResponseDirection,
    currentLineStartStop: string,
    currentLine: string | null
  ) {
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

  function isLastRoute(i: number, routes: Array<ResponseDirection>) {
    return i === routes.length - 1;
  }

  function createCompressedNode(
    currentLineStart: string,
    currentLineEnd: string,
    currentLine: string | null
  ): CompressedRoute {
    if (_.isNull(currentLine)) {
      //Very marginal case. Something is very wrong if we end up here
      console.error(
        "Current line was null for line from " +
          currentLineStart +
          " to " +
          currentLineEnd
      );
      return {
        from: currentLineStart,
        to: currentLineEnd,
        line: UNKNOWN_LINE_TEXT,
      };
    }
    return {
      from: currentLineStart,
      to: currentLineEnd,
      line: currentLine,
    };
  }
}
