import { provideNextLocation } from "./NextLocationProvider";
import { UPPER_RIGHT, RIGHT, LOWER_RIGHT, DOWN } from "./NextBusStopDirection";
import { STOP_GAP } from "./BusStopLocationConstant";

test("No existing locations", () => {
  const location = {
    x: 0,
    y: 0,
  };
  const duration = 1;
  const occupiedDirectionsForStop = [];
  const nextLocation = provideNextLocation(
    location,
    duration,
    occupiedDirectionsForStop
  );
  expect(nextLocation).toBeDefined();
  expect(nextLocation.direction).toBe(UPPER_RIGHT);
  validateNextLocationCoordinates(
    duration * STOP_GAP,
    -duration * STOP_GAP,
    nextLocation
  );
});

test("Next location down", () => {
  const location = {
    x: 0,
    y: 0,
  };
  const duration = 1;
  const occupiedDirectionsForStop = [UPPER_RIGHT, RIGHT, LOWER_RIGHT];
  const nextLocation = provideNextLocation(
    location,
    duration,
    occupiedDirectionsForStop
  );
  expect(nextLocation).toBeDefined();
  expect(nextLocation.direction).toBe(DOWN);
  validateNextLocationCoordinates(0, duration * STOP_GAP, nextLocation);
});

test("Take first in a gap", () => {
  const location = {
    x: 0,
    y: 0,
  };
  const duration = 1;
  const occupiedDirectionsForStop = [UPPER_RIGHT, LOWER_RIGHT];
  const nextLocation = provideNextLocation(
    location,
    duration,
    occupiedDirectionsForStop
  );
  expect(nextLocation).toBeDefined();
  expect(nextLocation.direction).toBe(RIGHT);
  validateNextLocationCoordinates(duration * STOP_GAP, 0, nextLocation);
});

function validateNextLocationCoordinates(
  expectedX,
  expectedY,
  nextLocationData
) {
  expect(nextLocationData).toBeDefined();
  expect(nextLocationData.point).toBeDefined();
  expect(nextLocationData.point.x).toBe(expectedX);
  expect(nextLocationData.point.y).toBe(expectedY);
}
