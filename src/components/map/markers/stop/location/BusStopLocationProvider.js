import { FIRST_LOCATION } from "./BusStopLocationConstant";
import { provideNextLocation } from "./NextLocationProvider";
import { isUndefinedOrNull } from "../../../../../util/Utilities";

/**
 * Deduces locations for bustops in a map with the stop names as keys
 * 
 * return {
 *  Map<String, BusStopLocation> map with bus stop names as keys and values being their x and y coordinates
 *  Integer xMax maximum z coordinate of the bus stops
 *  Integer yMax maximum y coordinate of the bus stops
 * }
 */
class BusStopLocationProvider {
  provide(firstStop) {
    const alreadyDeducedStops = new Map();
    const alreadyIncludedRoads = [];
    const occupiedDirections = new Map();
    alreadyDeducedStops.set(firstStop.name, {
      x: FIRST_LOCATION.x,
      y: FIRST_LOCATION.y,
    });
    this.addNeighbours(
      alreadyDeducedStops,
      alreadyIncludedRoads,
      occupiedDirections,
      firstStop,
      FIRST_LOCATION
    );
    const maxCoordinates = this.deduceMaxCoordinates(alreadyDeducedStops);
    console.log(maxCoordinates);
    return {
      map: alreadyDeducedStops,
      xMax: maxCoordinates.x,
      yMax: maxCoordinates.y,
    };
  }

  addNeighbours(
    alreadyDeducedStops,
    alreadyIncludedRoads,
    occupiedDirections,
    stopData,
    currentLocation
  ) {
    const neighbourStops = [];
    this.deduceNeighbours(
      stopData,
      alreadyIncludedRoads,
      alreadyDeducedStops,
      occupiedDirections,
      currentLocation,
      neighbourStops
    );
    neighbourStops.forEach((neighbourStop) => {
      this.addNeighbours(
        alreadyDeducedStops,
        alreadyIncludedRoads,
        occupiedDirections,
        neighbourStop.stopData,
        neighbourStop.location
      );
    });
  }

  deduceNeighbours(
    stopData,
    alreadyIncludedRoads,
    alreadyDeducedStops,
    occupiedDirections,
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
      if (!isUndefinedOrNull(alreadyDeducedStops.get(road.to.name))) {
        return;
      }
      const nextLocation = this.deduceNextLocation(
        currentLocation,
        road,
        occupiedDirections
      );
      if (nextLocation === null) {
        console.log("No direction for ", road.to.name);
      }
      alreadyDeducedStops.set(road.to.name, nextLocation.point);
      neighbourStops.push({
        stopData: road.to,
        location: nextLocation.point,
      });
    });
  }

  deduceNextLocation(currentLocation, road, occupiedDirections) {
    const nextLocation = provideNextLocation(
      currentLocation,
      road.duration,
      occupiedDirections.get(road.from)
    );
    this.addOccupiedDirection(
      road.from,
      nextLocation.direction,
      occupiedDirections
    );
    return nextLocation;
  }

  addOccupiedDirection(stopName, direction, occupiedDirections) {
    const occupiedDirectionsForStop = occupiedDirections.get(stopName);
    if (isUndefinedOrNull(occupiedDirectionsForStop)) {
      const newDirectionArray = [];
      newDirectionArray.push(direction);
      occupiedDirections.set(stopName, newDirectionArray);
    } else {
      occupiedDirectionsForStop.push(direction);
    }
  }

  deduceMaxCoordinates(deducedStops) {
    let xMax = 0;
    let yMax = 0;
    for (let value of Array.from(deducedStops.values())) {
      if (xMax < value.x) {
        xMax = value.x;
      }
      if (yMax < value.y) {
        yMax = value.y;
      }
    }
    return {
      x: xMax,
      y: yMax,
    };
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
