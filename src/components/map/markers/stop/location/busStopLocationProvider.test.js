import { provideBusStopLocations } from "./busStopLocationProvider";
import TransportDataSingleton from "../../../../../data/TransportDataSingleton";

test("Integration test", () => {
  const stopsMap = TransportDataSingleton.getInstance().stops;
  const busStopLocations = provideBusStopLocations(
    stopsMap.values().next().value
  );

  expect(busStopLocations).toBeDefined();
  expect(busStopLocations.map).toBeDefined();
  validateMaxCoordinates(busStopLocations);
  validateLocations(stopsMap, busStopLocations.map);
});

function validateMaxCoordinates(busStopLocations) {
  expect(busStopLocations.yMax).toBeDefined();
  expect(busStopLocations.xMax).toBeDefined();
  expect(busStopLocations.xMax).toBeGreaterThanOrEqual(0);
  expect(busStopLocations.yMax).toBeGreaterThanOrEqual(0);
}

function validateLocations(stopsMap, busStopLocationMap) {
  validateAllStopsHaveLocation(stopsMap, busStopLocationMap);
  Array.from(busStopLocationMap.values()).forEach((locationData) => {
    expect(locationData.x).toBeGreaterThanOrEqual(0);
    expect(locationData.y).toBeGreaterThanOrEqual(0);
  });

  function validateAllStopsHaveLocation(stopsMap, busStopLocationMap) {
    Array.from(stopsMap.keys()).forEach(stopName => {
      expect(busStopLocationMap.get(stopName)).toBeDefined();
    });
  }
}
