import { STOP_GAP } from "./BusStopConstant";
import { isUndefinedOrNull } from "../../../../util/Utilities";

/**
 * Search for first available nearby location. We first attempt to find a free location with straight lines to right, down, left and up.
 * If no free spots are found, we try with diagonals.
 */
export function provideNextLocation(location, occupiedLocations) {
  const straightLocation = findLocationFromStraightLines(
    location,
    occupiedLocations
  );
  if (straightLocation == null) {
    return findLocationFromDiagonal(location, occupiedLocations);
  } else {
    return straightLocation;
  }

  function findLocationFromStraightLines(location, occupiedLocations) {
    //Right
    if (isLocationFree(location.x + STOP_GAP, location.y, occupiedLocations)) {
      return {
        x: location.x + STOP_GAP,
        y: location.y,
      };
    }
    //Down
    else if (
      isLocationFree(location.x, location.y + STOP_GAP, occupiedLocations)
    ) {
      return {
        x: location.x,
        y: location.y + STOP_GAP,
      };
    }
    //Left
    else if (
      isLocationFree(location.x - STOP_GAP, location.y, occupiedLocations)
    ) {
      return {
        x: location.x - STOP_GAP,
        y: location.y,
      };
    }
    //UP
    else if (
      isLocationFree(location.x, location.y - STOP_GAP, occupiedLocations)
    ) {
      return {
        x: location.x,
        y: location.y - STOP_GAP,
      };
    } else {
      return null;
    }
  }

  function findLocationFromDiagonal(location, occupiedLocations) {
    //Upper right
    if (
      isLocationFree(
        location.x + STOP_GAP,
        location.y - STOP_GAP,
        occupiedLocations
      )
    ) {
      return {
        x: location.x + STOP_GAP,
        y: location.y - STOP_GAP,
      };
    }
    //Lower right
    else if (
      isLocationFree(
        location.x - STOP_GAP,
        location.y + STOP_GAP,
        occupiedLocations
      )
    ) {
      return {
        x: location.x - STOP_GAP,
        y: location.y + STOP_GAP,
      };
    }
    //Lower left
    else if (
      isLocationFree(
        location.x - STOP_GAP,
        location.y - STOP_GAP,
        occupiedLocations
      )
    ) {
      return {
        x: location.x - STOP_GAP,
        y: location.y - STOP_GAP,
      };
    }
    //Upper left
    else if (
      isLocationFree(
        location.x - STOP_GAP,
        location.y + STOP_GAP,
        occupiedLocations
      )
    ) {
      return {
        x: location.x - STOP_GAP,
        y: location.y + STOP_GAP,
      };
    } else {
      return null;
    }
  }

  function isLocationFree(x, y, occupiedLocations) {
    const yLocationsInXAxis = occupiedLocations.get(x);
    return (
      isUndefinedOrNull(yLocationsInXAxis) || !yLocationsInXAxis.includes(y)
    );
  }
}
