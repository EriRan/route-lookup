import TransportDataSingleton from "./TransportDataSingleton";

test("Transport Data integration", () => {
  const transportDataSingleton = TransportDataSingleton.getInstance();
  expect(transportDataSingleton).toBeDefined();
  expect(transportDataSingleton.stops).toBeInstanceOf(Map);
  expect(transportDataSingleton.lines).toBeInstanceOf(Array);

  validateStops(transportDataSingleton.stops);
  validateHasLines(transportDataSingleton.lines);

  function validateStops(stops) {
    expect(stops.size).toBeGreaterThan(0);
    Array.from(stops.values()).forEach((stop) => {
      validateStopHasRoads(stop);
    });
  }

  function validateStopHasRoads(stop) {
    expect(stop.roads).toBeInstanceOf(Array);
    expect(stop.roads.length).toBeGreaterThan(0);
  }

  function validateHasLines(lines) {
    expect(lines).toBeInstanceOf(Array);
    expect(lines.length).toBeGreaterThan(0);
  }
});

test("Is singleton", () => {
  expect(TransportDataSingleton.getInstance()).toEqual(
    TransportDataSingleton.getInstance()
  );
});
