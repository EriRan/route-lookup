import { FIRST_LOCATION } from "./BusStopConstant";
import { provideNextLocation } from "./NextLocationProvider";
import { RIGHT } from "./NextBusStopDirection";
import { isUndefinedOrNull } from "../../../../util/Utilities";

class BusStopLocationProvider {
  provide(firstStop) {
    const alreadyDeducedStops = new Map();
    const alreadyIncludedRoads = [];
    alreadyDeducedStops.set(firstStop.name, {
      x: FIRST_LOCATION.x,
      y: FIRST_LOCATION.y,
    });
    this.addNeighbours(
      alreadyDeducedStops,
      alreadyIncludedRoads,
      firstStop,
      FIRST_LOCATION
    );
    return alreadyDeducedStops;
  }

  addNeighbours(
    alreadyDeducedStops,
    alreadyIncludedRoads,
    stopData,
    currentLocation
  ) {
    const neighbourStops = [];
    const nextDirectionIndexContainer = { next: RIGHT };
    this.deduceNeighbours(
      stopData,
      alreadyIncludedRoads,
      alreadyDeducedStops,
      nextDirectionIndexContainer,
      currentLocation,
      neighbourStops
    );
    neighbourStops.forEach((neighbourStop) => {
      this.addNeighbours(
        alreadyDeducedStops,
        alreadyIncludedRoads,
        neighbourStop.stopData,
        neighbourStop.location
      );
    });
  }

  deduceNeighbours(
    stopData,
    alreadyIncludedRoads,
    alreadyDeducedStops,
    nextDirectionIndexContainer,
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
        nextDirectionIndexContainer,
        currentLocation
      );
      alreadyDeducedStops.set(road.to.name, nextLocation);
      neighbourStops.push({
        stopData: road.to,
        location: nextLocation,
      });
    });
  }

  deduceNextLocation(nextDirectionIndexContainer, currentLocation) {
    const nextLocation = provideNextLocation(
      currentLocation,
      nextDirectionIndexContainer.next
    );
    nextDirectionIndexContainer.next++;
    return nextLocation;
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
