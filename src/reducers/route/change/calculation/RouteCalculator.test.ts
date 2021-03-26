import RouteCalculator from "./RouteCalculator";
import TransportDataSingleton from "../../../../data/TransportDataSingleton";
import { CalculationResponse } from "./types";
import {
  ALREADY_AT_DESTINATION,
  UNKNOWN_END_STOP_INPUTED,
  UNKNOWN_START_STOP_INPUTED,
} from "./ErrorMessageConstant";

const calculator = new RouteCalculator(TransportDataSingleton.getInstance());

test("Route with no lines is not used", () => {
  const response = calculator.calculate("A", "D");
  validateResponse(response, 5, 2);
  Array.from(response.route!.entries()).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    expect(key).not.toBe("A-D");
    expect(value.line).toBe("Vihreä");
  });
});

test("Optimal route is deduced", () => {
  const response = calculator.calculate("A", "R");
  validateResponse(response, 11, 3);
  expect(response.route!.get("A-B")!.line).toBe("Vihreä");
  expect(response.route!.get("B-D")!.line).toBe("Vihreä");
  expect(response.route!.get("D-R")!.line).toBe("Punainen");
});

test("Changing bus lines is avoided", () => {
  const response: CalculationResponse = calculator.calculate("A", "J");
  validateResponse(response, 10, 7);
  response.route!.forEach((singleDirection) => {
    expect(singleDirection.line).toBe("Vihreä");
  });
});

test("Unknown start stop", () => {
  const response = calculator.calculate("Railway station", "R");
  expect(response).toBeDefined();
  expect(response.errorMessage).toBeDefined();
  expect(response.errorMessage).toBe(UNKNOWN_START_STOP_INPUTED);
});

test("Unknown end stop", () => {
  const response = calculator.calculate("A", "Railway station");
  expect(response).toBeDefined();
  expect(response.errorMessage).toBeDefined();
  expect(response.errorMessage).toBe(UNKNOWN_END_STOP_INPUTED);
});

test("Already at the destination", () => {
  const response = calculator.calculate("A", "A");
  expect(response).toBeDefined();
  expect(response.errorMessage).toBeDefined();
  expect(response.errorMessage).toBe(ALREADY_AT_DESTINATION);
});

function validateResponse(
  response: CalculationResponse,
  totalDuration: number,
  routeSize: number
) {
  expect(response).toBeDefined();
  expect(response.errorMessage).toBeNull();
  expect(response.totalDuration).toBeDefined();
  expect(response.totalDuration).toBe(totalDuration);
  expect(response.route).toBeDefined();
  expect(response.route!.size).toBe(routeSize);
}
