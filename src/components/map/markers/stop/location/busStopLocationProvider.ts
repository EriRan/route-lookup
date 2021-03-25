import { FIRST_LOCATION } from "./BusStopLocationConstant";
import { provideNextLocation } from "./nextLocationProvider";
import { isUndefinedOrNull } from "../../../../../util/Utilities";
import { Road, Stop } from "../../../../../data/mapper/types";
import { BusStopLocation, BusStopLocations } from "../../../types";
import {
  AlreadyIncludedRoad,
  Direction,
  NeighbourStop,
  NextLocation,
} from "./types";

/**
 * Deduces locations for bustops in a map with the stop names as keys
 *
 * return {
 *  Map<String, BusStopLocation> map with bus stop names as keys and values being their x and y coordinates
 *  Integer xMax maximum z coordinate of the bus stops
 *  Integer yMax maximum y coordinate of the bus stops
 * }
 */
export function provideBusStopLocations(firstStop: Stop): BusStopLocations {
  const alreadyDeducedStops = new Map<string, BusStopLocation>();
  const alreadyIncludedRoads = new Array<AlreadyIncludedRoad>();
  const occupiedDirections = new Map<string, Array<Direction>>();
  alreadyDeducedStops.set(firstStop.name, {
    x: FIRST_LOCATION.x,
    y: FIRST_LOCATION.y,
  });
  addNeighbours(
    alreadyDeducedStops,
    alreadyIncludedRoads,
    occupiedDirections,
    firstStop,
    FIRST_LOCATION
  );
  const maxCoordinates = deduceMaxCoordinates(alreadyDeducedStops);
  return {
    busStopLocationMap: alreadyDeducedStops,
    xMax: maxCoordinates.x,
    yMax: maxCoordinates.y,
  };

  function addNeighbours(
    alreadyDeducedStops: Map<string, BusStopLocation>,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>,
    occupiedDirections: Map<string, Array<Direction>>,
    stop: Stop,
    currentLocation: BusStopLocation
  ) {
    const neighbourStops = new Array<NeighbourStop>();
    deduceNeighbours(
      alreadyDeducedStops,
      alreadyIncludedRoads,
      occupiedDirections,
      stop,
      currentLocation,
      neighbourStops
    );
    neighbourStops.forEach((neighbourStop) => {
      addNeighbours(
        alreadyDeducedStops,
        alreadyIncludedRoads,
        occupiedDirections,
        neighbourStop.stop,
        neighbourStop.location
      );
    });
  }

  function deduceNeighbours(
    alreadyDeducedStops: Map<string, BusStopLocation>,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>,
    occupiedDirections: Map<string, Array<Direction>>,
    stop: Stop,
    currentLocation: BusStopLocation,
    neighbourStops: Array<NeighbourStop>
  ) {
    //Todo: These returns aren't good. This could be done in a functional way by doing map->filter non nulls-> forEach all remaining,
    //but we still need to pass the road object to the last forEach for this to work. Maybe a for loop inside the road for each?
    stop.roads.forEach((road) => {
      if (isRoadAlreadyIncluded(road, alreadyIncludedRoads)) {
        return;
      }
      alreadyIncludedRoads.push({
        fromName: road.from.name,
        toName: road.to.name,
      });
      if (!isUndefinedOrNull(alreadyDeducedStops.get(road.to.name))) {
        return;
      }
      const nextLocation = deduceNextLocation(
        currentLocation,
        road,
        occupiedDirections
      );
      if (nextLocation === null) {
        console.log("No direction for ", road.to.name);
        return; //Return is equivalent of continue inside a forEach loop
      }
      alreadyDeducedStops.set(road.to.name, nextLocation!.point);
      neighbourStops.push({
        stop: road.to,
        location: nextLocation!.point,
      });
    });
  }

  function deduceNextLocation(
    currentLocation: BusStopLocation,
    road: Road,
    occupiedDirections: Map<string, Array<Direction>>
  ): NextLocation | null {
    const nextLocation = provideNextLocation(
      currentLocation,
      road.duration,
      occupiedDirections.get(road.from.name)
    );
    if (nextLocation === null) {
      return null;
    }
    addOccupiedDirection(
      road.from.name,
      nextLocation.direction,
      occupiedDirections
    );
    return nextLocation;
  }

  function addOccupiedDirection(
    stopName: string,
    direction: Direction,
    occupiedDirections: Map<string, Array<Direction>>
  ) {
    const occupiedDirectionsForStop = occupiedDirections.get(stopName);
    if (isUndefinedOrNull(occupiedDirectionsForStop)) {
      const newDirectionArray = Array<Direction>();
      newDirectionArray.push(direction);
      occupiedDirections.set(stopName, newDirectionArray);
    } else {
      occupiedDirectionsForStop!.push(direction);
    }
  }

  function deduceMaxCoordinates(deducedStops: Map<string, BusStopLocation>) {
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

  function isRoadAlreadyIncluded(
    road: Road,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>
  ) {
    return alreadyIncludedRoads.some((alreadyIncludedRoad) => {
      return (
        (road.to.name === alreadyIncludedRoad.toName ||
          road.to.name === alreadyIncludedRoad.fromName) &&
        (road.from.name === alreadyIncludedRoad.fromName ||
          road.from.name === alreadyIncludedRoad.toName)
      );
    });
  }
}
