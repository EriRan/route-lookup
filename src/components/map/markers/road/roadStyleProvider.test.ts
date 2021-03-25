import { provideStyles } from "./roadStyleProvider";
import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR,
} from "./RoadConstant";
import { ResponseDirection } from "../../../../reducers/route/change/calculation/types";

test("Road with no lines", () => {
  const isRouteCalculated = false; //Does not matter, so should not be needed

  const styleObjects = provideStyles(isRouteCalculated);
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
  expect(styleObject.color).toBe(UNUSED_ROAD_COLOR);
});

test("Has lines and route is not calculated", () => {
  const includesLines = ["Punainen", "Sininen"];
  const isRouteCalculated = false;

  const styleObjects = provideStyles(
    isRouteCalculated,
    undefined, //Does not matter here
    includesLines
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
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    isRouteCalculated,
    undefined, //Calculated route does not include this node
    includesLines
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
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    isRouteCalculated,
    undefined, //Calculated route does not include this node
    includesLines
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY_YELLOW);
  expect(styleObject.color).toBeDefined();
});

test("Has lines, route is calculated for current node", () => {
  const includesLines = ["Punainen", "Sininen"];
  const calculatedRouteNode: ResponseDirection = {
    from: "A",
    to: "B",
    line: "Punainen",
    duration: 123,
  };
  const isRouteCalculated = true;

  const styleObjects = provideStyles(
    isRouteCalculated,
    calculatedRouteNode,
    includesLines
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
  const isRouteCalculated = false;

  const styleObjects = provideStyles(
    isRouteCalculated,
    undefined, //Not relevant
    includesLines
  );
  expect(styleObjects).toBeInstanceOf(Array);
  expect(styleObjects).toHaveLength(1);

  const styleObject = styleObjects[0];
  expect(styleObject.color).toBe(UNKNOWN_ROAD_COLOR);
  expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
});
