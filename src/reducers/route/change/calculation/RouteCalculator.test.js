import RouteCalculator from "./RouteCalculator";
import TransportDataSingleton from "../../../../data/TransportDataSingleton";

const calculator = new RouteCalculator(TransportDataSingleton.getInstance());

test("Route with no lines is not used", () => {
  const response = calculator.calculate("A", "D");
  validateResponse(response, 5, 2);
  Array.from(response.route.entries()).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    expect(key).not.toBe("A-D")
    expect(value.line).toBe("Vihreä");
  })
});

test("Optimal route is deduced", () => {
  const response = calculator.calculate("A", "R");
  validateResponse(response, 11, 3);
  expect(response.route.get("A-B").line).toBe("Vihreä");
  expect(response.route.get("B-D").line).toBe("Vihreä");
  expect(response.route.get("D-R").line).toBe("Punainen");
})

test("Changing bus lines is avoided", () => {
  const response = calculator.calculate("A", "J");
  validateResponse(response, 10, 7);
  Array.from(response.route.values(route => {
    expect(route.line).toBe("Vihreä");
  }))
})

function validateResponse(response, totalDuration, nodeAmount) {
  expect(response).toBeDefined();
  expect(response.errorMessage).toBeNull();
  expect(response.totalDuration).toBe(totalDuration);
  expect(response.route.size).toBe(nodeAmount);
}
