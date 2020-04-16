import { STOP_GAP } from "./BusStopConstant";
import { isUndefinedOrNull } from "../../../../util/Utilities";

/**
 * Search for first available nearby location. We try 9 directions,
 * starting from upper right and then try every direction in a clockwise order
 */
export function provideNextLocation(location, occupiedLocations) {
  return findFreeLocation(location, occupiedLocations);

  function findFreeLocation(location, occupiedLocations) {
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
    //Right
    else if (
      isLocationFree(location.x + STOP_GAP, location.y, occupiedLocations)
    ) {
      return {
        x: location.x + STOP_GAP,
        y: location.y,
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
    //Down
    else if (
      isLocationFree(location.x, location.y + STOP_GAP, occupiedLocations)
    ) {
      return {
        x: location.x,
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
    //Left
    else if (
      isLocationFree(location.x - STOP_GAP, location.y, occupiedLocations)
    ) {
      return {
        x: location.x - STOP_GAP,
        y: location.y,
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
      console.log("Unable to find free location!");
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
