import { provideStyles } from "./roadStyleProvider";
import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR,
} from "./RoadConstant";

test("Road with no lines", () => {
  const includesLines = [];
  const calculatedRouteNode = null; //Does not matter, so should not be needed
  const isRouteCalculated = null; //Does not matter, so should not be needed

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
  expect(styleObject.color).toBe(UNUSED_ROAD_COLOR);
});

test("Has lines and route is not calculated", () => {
  const includesLines = ["Punainen", "Sininen"];
  const calculatedRouteNode = null; //Does not matter, so should not be needed
  const isRouteCalculated = false;

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(2);

  styleObjects.forEach((styleObject) => {
    expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
    expect(styleObject.color).toBeDefined();
  });
});

test("Has lines, route is calculated but not for current route node", () => {
  const includesLines = ["Punainen", "Sininen"];
  const calculatedRouteNode = null; //Calculated route does not include this node
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(2);

  styleObjects.forEach((styleObject) => {
    expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
    expect(styleObject.color).toBeDefined();
  });
});

test("Has lines, route is calculated but not for current route node with yellow special case", () => {
  const includesLines = ["Keltainen"];
  const calculatedRouteNode = null; //Calculated route does not include this node
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY_YELLOW);
  expect(styleObject.color).toBeDefined();
});

test("Has lines, route is calculated for current node", () => {
  const includesLines = ["Punainen", "Sininen"];
  const calculatedRouteNode = { line: "Punainen" };
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(2);

  styleObjects.forEach((styleObject) => {
    expect(styleObject.color).toBeDefined();
    if (styleObject.color === "red") {
      expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
    } else {
      expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
    }
  });
});

test("Line with undefined color", () => {
  const includesLines = ["Jokeri"];
  const calculatedRouteNode = null;
  const isRouteCalculated = false;

  const styleObjects = provideStyles(
    includesLines,
    calculatedRouteNode,
    isRouteCalculated
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.color).toBe(UNKNOWN_ROAD_COLOR);
  expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
});
