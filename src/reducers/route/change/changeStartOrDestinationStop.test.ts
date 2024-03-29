import { Payload, RouteStore } from "../types";
import { changeStartOrDestinationStop } from "./changeStartOrDestinationStop";

describe("stopsStateChangeDeducer", () => {
  test("Payload equal to start stop sets start to null", () => {
    const state = createCurrentState("A", "B");
    changeStartOrDestinationStop(state, createPayload("A", false));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop.name).toBeNull();
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBe("B");
    expect(state.calculatedRoute).toBeNull();
  });

  test("Payload equal to start stop considered equal even if casings arent the same", () => {
    const state = createCurrentState("A", "B");
    changeStartOrDestinationStop(state, createPayload("a", false));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop.name).toBeNull();
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBe("B");
    expect(state.calculatedRoute).toBeNull();
  });

  test("Payload equal to destination stop sets destination to null", () => {
    const state = createCurrentState("A", "B");
    changeStartOrDestinationStop(state, createPayload("B", false));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop!.name).toBe("A");
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBeNull();
    expect(state.calculatedRoute).toBeNull();
  });

  test("Payload equal to destination stop considered equal even if casings arent the same", () => {
    const state = createCurrentState("A", "b");
    changeStartOrDestinationStop(state, createPayload("B", false));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop!.name).toBe("A");
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBeNull();
    expect(state.calculatedRoute).toBeNull();
  });

  test("Do nothing if payload has an error", () => {
    const state = createCurrentState("A", "B");
    changeStartOrDestinationStop(state, createPayload("B", true));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop!.name).toBe("A");
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBe("B");
    expect(state.calculatedRoute).toBeNull();
  });

  test("Set new destination if both start and destination in state and new destination is not equal to either", () => {
    //Would be nice to mock the calculation function somehow so that it doesn't get called for real.
    //We would then save a few milliseconds.
    const state = createCurrentState("A", "C");
    changeStartOrDestinationStop(state, createPayload("B", false));

    expect(state).toBeDefined();
    expect(state.startStop).toBeDefined();
    expect(state.startStop.name).toBe("A");
    expect(state.destinationStop).toBeDefined();
    expect(state.destinationStop.name).toBe("B");
    expect(state.calculatedRoute).toBeNull(); // Not null and not undefined
  });

  function createCurrentState(
    startStop: string,
    destinationStop: string
  ): RouteStore {
    return {
      startStop: {
        name: startStop,
      },
      destinationStop: {
        name: destinationStop,
      },
      calculatedRoute: null,
    };
  }

  function createPayload(stopName: string, hasErrors: boolean): Payload {
    return {
      name: stopName,
      hasErrors: hasErrors,
    };
  }
});
