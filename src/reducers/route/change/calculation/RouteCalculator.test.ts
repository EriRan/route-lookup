import RouteCalculator from "./RouteCalculator";
import TransportDataSingleton from "../../../../data/TransportDataSingleton";
import { CalculationResponse } from "./types";
import {
  ALREADY_AT_DESTINATION,
  UNKNOWN_END_STOP_INPUTED,
  UNKNOWN_START_STOP_INPUTED,
} from "./ErrorMessageConstant";
import { StopState } from "../../types";

const calculator = new RouteCalculator(TransportDataSingleton.getInstance());

test("Route with no lines is not used", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("D");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response, 5, 2);
  Array.from(response.route!.entries()).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    expect(key).not.toBe("A-D");
    expect(value.line).toBe("Vihreä");
  });
});

test("Optimal route is deduced", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("R");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response, 11, 3);
  expect(response.route!.get("A-B")!.line).toBe("Vihreä");
  expect(response.route!.get("B-D")!.line).toBe("Vihreä");
  expect(response.route!.get("D-R")!.line).toBe("Punainen");
});

/**
 * Encountered this when browsing routes: If the first available line is selected for the first stop
 * when there are more than one available, it can select a different line than a line that could be
 * used through the whole route.
 */
test("Same line can be used all the way", () => {
  const startStopState = createStopState("E");
  const destinationStopState = createStopState("H");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response, 4, 1);
  expect(response.route!.get("E-H")!.line).toBe("Vihreä");
});

test("Changing bus lines is avoided", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("J");
  const response: CalculationResponse = calculator.calculate(
    startStopState,
    destinationStopState
  );

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response, 10, 7);
  response.route!.forEach((singleDirection) => {
    expect(singleDirection.line).toBe("Vihreä");
  });
});

test("Unknown start stop", () => {
  const startStopState = createStopState("Railway station");
  const destinationStopState = createStopState("A");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(true);
  expect(destinationStopState.hasErrors).toBe(false);

  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(1);
  expect(response.errorMessages).toContain(UNKNOWN_START_STOP_INPUTED);
});

test("Unknown end stop", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("Railway station");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(true);

  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(1);
  expect(response.errorMessages).toContain(UNKNOWN_END_STOP_INPUTED);
});

test("Already at the destination", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("A");
  const response = calculator.calculate(startStopState, destinationStopState);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(1);
  expect(response.errorMessages).toContain(ALREADY_AT_DESTINATION);
});

function validateResponse(
  response: CalculationResponse,
  totalDuration: number,
  routeSize: number
) {
  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(0);
  expect(response.totalDuration).toBeDefined();
  expect(response.totalDuration).toBe(totalDuration);
  expect(response.route).toBeDefined();
  expect(response.route!.size).toBe(routeSize);
}

function createStopState(name: string): StopState {
  return {
    name: name,
    hasErrors: false,
  };
}
