import { convertCalculation } from "./responseConverter";

import { ROUTE_NOT_FOUND } from "./ErrorMessageConstant";

test("Route not found error", () => {
  const nodes = [];
  const startStop = "A";
  const response = convertCalculation(startStop, nodes);
  expect(response).toBeDefined();
  expect(response.errorMessage).toBe(ROUTE_NOT_FOUND);
});

test("Valid route", () => {
  const nodes = [];
  const startStop = "A";
  pushNextNode(nodes, startStop, "B", "C", 2, "line1");
  pushNextNode(nodes, startStop, "C", "D", 4, "line1");
  pushNextNode(nodes, startStop, "D", "E", 10, "line2");
  pushNextNode(nodes, startStop, "E", null, 12, "line2");
  const response = convertCalculation(startStop, nodes);

  expect(response).toBeDefined();
  expect(response.errorMessage).toBeNull();
  expect(response.totalDuration).toBe(12);
  expect(response.route).toBeInstanceOf(Map);
  
  //Validate keys created from paths between stops exist
  expect(response.route.get("A-B")).toBeDefined();
  expect(response.route.get("B-C")).toBeDefined();
  expect(response.route.get("C-D")).toBeDefined();
  expect(response.route.get("D-E")).toBeDefined();
});

/**
 * Push the same kind of data that would come from RouteCalculator to a array. Links the nodes together with a
 * roads that are created to both previous and next after the first added node.
 *
 * First pushed node is a special case because we need to create a link to the start node which is where the route calculation starts from.
 */
function pushNextNode(
  currentNodes,
  startStop,
  fromName,
  toName,
  totalDuration,
  lineBeingUsed
) {
  if (currentNodes.length === 0) {
    currentNodes.push({
      stopData: {
        name: fromName,
        roads: createRoadToNextAndPrevious(startStop, fromName, toName),
      },
      totalDuration: totalDuration,
      lineBeingUsed: lineBeingUsed,
    });
  } else {
    const previousNode = currentNodes[currentNodes.length - 1];
    currentNodes.push({
      stopData: {
        name: fromName,
        roads: createRoadToNextAndPrevious(
          previousNode.stopData.name,
          fromName,
          toName
        ),
      },
      totalDuration: totalDuration,
      lineBeingUsed: lineBeingUsed,
    });
  }
}

function createRoadToNextAndPrevious(previousName, fromName, toName) {
  if (toName == null) {
    return [createOneRoad(fromName, previousName, true)]
  } else {
    return [
      createOneRoad(fromName, toName, false),
      createOneRoad(fromName, previousName, true),
    ];
  }
  
}

function createOneRoad(fromName, toName, isReverse) {
  return {
    from: {
      name: fromName,
    },
    to: {
      name: toName,
    },
    isReverse: isReverse,
  };
}
