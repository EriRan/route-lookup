import { FIRST_LOCATION } from "./BusStopConstant";
import { provideNextLocation } from "./NextLocationProvider";
import { isUndefinedOrNull } from "../../../../util/Utilities";

/**
 * Deduces locations for bustops.
 */
class BusStopLocationProvider {
  provide(firstStop) {
    const alreadyDeducedStops = new Map();
    const alreadyIncludedRoads = [];
    const occupiedLocations = new Map();
    alreadyDeducedStops.set(firstStop.name, {
      x: FIRST_LOCATION.x,
      y: FIRST_LOCATION.y,
    });
    occupiedLocations.set(FIRST_LOCATION.x, new Array(FIRST_LOCATION.y));
    this.addNeighbours(
      alreadyDeducedStops,
      alreadyIncludedRoads,
      occupiedLocations,
      firstStop,
      FIRST_LOCATION
    );
    return alreadyDeducedStops;
  }

  addNeighbours(
    alreadyDeducedStops,
    alreadyIncludedRoads,
    occupiedLocations,
    stopData,
    currentLocation
  ) {
    const neighbourStops = [];
    this.deduceNeighbours(
      stopData,
      alreadyIncludedRoads,
      alreadyDeducedStops,
      occupiedLocations,
      currentLocation,
      neighbourStops
    );
    neighbourStops.forEach((neighbourStop) => {
      this.addNeighbours(
        alreadyDeducedStops,
        alreadyIncludedRoads,
        occupiedLocations,
        neighbourStop.stopData,
        neighbourStop.location
      );
    });
  }

  deduceNeighbours(
    stopData,
    alreadyIncludedRoads,
    alreadyDeducedStops,
    occupiedLocations,
    currentLocation,
    neighbourStops
  ) {
    stopData.roads.forEach((road) => {
      if (this.isRoadAlreadyIncluded(road, alreadyIncludedRoads)) {
        return;
      }
      alreadyIncludedRoads.push({
        fromName: road.from.name,
        toName: road.to.name,
      });
      const potentialNeighbour = alreadyDeducedStops.get(road.to.name);
      if (!isUndefinedOrNull(potentialNeighbour)) {
        return;
      }
      const nextLocation = this.deduceNextLocation(
        occupiedLocations,
        currentLocation
      );
      if (nextLocation.x === 0) {
        console.log("No location for ", road.to.name);
      }
      alreadyDeducedStops.set(road.to.name, nextLocation);
      neighbourStops.push({
        stopData: road.to,
        location: nextLocation,
      });
    });
  }

  deduceNextLocation(occupiedLocations, currentLocation) {
    const nextLocation = provideNextLocation(
      currentLocation,
      occupiedLocations,
    );
    this.addOccupiedLocation(nextLocation, occupiedLocations)
    return nextLocation;
  }

  addOccupiedLocation(nextLocation, occupiedLocations) {
    const yLocationsInXAxis = occupiedLocations.get(nextLocation.x);
    if (isUndefinedOrNull(yLocationsInXAxis)) {
      const newYArray = [];
      newYArray.push(nextLocation.y);
      occupiedLocations.set(nextLocation.x, newYArray);
    } else {
      yLocationsInXAxis.push(nextLocation.y);
    }
  }

  isRoadAlreadyIncluded(road, alreadyIncludedRoads) {
    return alreadyIncludedRoads.some((alreadyIncludedRoad) => {
      return (
        (road.toName === alreadyIncludedRoad.toName ||
          road.toName === alreadyIncludedRoad.fromName) &&
        (road.fromName === alreadyIncludedRoad.fromName ||
          road.fromName === alreadyIncludedRoad.toName)
      );
    });
  }
}

export default BusStopLocationProvider;
