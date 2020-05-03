import { changeStartOrDestination } from "./stopsStateChangeDeducer";

test("Set start stop to null", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("A", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBeNull();
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop.name).toBe("B");
});

test("Set destination stop to null", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("B", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop.name).toBeNull();
});

test("Do nothing if payload has an error", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("B", true)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop.name).toBe("B");
});

test("Calculation is done if updates to a new stop", () => {
  //Would be nice to mock the calculation function somehow so that it doesn't get called for real.
  //We would then save a few milliseconds.
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "C"),
    createPayload("B", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop.name).toBe("B");
  expect(stateChange.calculatedRoute).toBeDefined();
  expect(stateChange.calculatedRoute.route).toBeDefined();
  expect(stateChange.calculatedRoute.totalDuration).toBeDefined();
});

function createCurrentState(startStop, destinationStop) {
  return {
    startStop: {
      name: startStop,
    },
    destinationStop: {
      name: destinationStop,
    },
  };
}

function createPayload(stopName, hasError) {
  return {
    name: stopName,
    hasError: hasError,
  };
}
