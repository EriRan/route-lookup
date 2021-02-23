import { compressResponse } from "./routeResponseCompressor";

test("Empty array", () => {
  const compressedResponse = compressResponse([]);
  expect(compressedResponse).toBeInstanceOf(Array);
  expect(compressedResponse).toHaveLength(0);
});

test("Single line path", () => {
  const compressedResponse = compressResponse([
    createOneRoute("A", "B", "line1"),
    createOneRoute("B", "C", "line1"),
  ]);
  validateResponse(compressedResponse, 1);
  validateSingleRoute(compressedResponse[0], "A", "C", "line1");
});

test("Multiple lines", () => {
  const compressedResponse = compressResponse([
    createOneRoute("A", "B", "line1"),
    createOneRoute("B", "C", "line2"),
    createOneRoute("C", "D", "line3"),
    createOneRoute("D", "E", "line4"),
  ]);
  validateResponse(compressedResponse, 4);
  validateSingleRoute(compressedResponse[0], "A", "B", "line1");
  validateSingleRoute(compressedResponse[1], "B", "C", "line2");
  validateSingleRoute(compressedResponse[2], "C", "D", "line3");
  validateSingleRoute(compressedResponse[3], "D", "E", "line4");
});

function validateSingleRoute(
  singleRoute,
  expectedFrom,
  expectedTo,
  expectedLine
) {
  expect(singleRoute.from).toBe(expectedFrom);
  expect(singleRoute.to).toBe(expectedTo);
  expect(singleRoute.line).toBe(expectedLine);
}

function validateResponse(compressedResponse, expectedLength) {
  expect(compressedResponse).toBeInstanceOf(Array);
  expect(compressedResponse).toHaveLength(expectedLength);
}

function createOneRoute(fromName, toName, line) {
  return {
    from: fromName,
    to: toName,
    line: line,
  };
}
