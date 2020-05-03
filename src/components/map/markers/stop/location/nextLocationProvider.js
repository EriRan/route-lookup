import { STOP_GAP } from "./BusStopLocationConstant";
import {
  UPPER_RIGHT,
  RIGHT,
  LOWER_RIGHT,
  DOWN,
  LOWER_LEFT,
  LEFT,
  UPPER_LEFT,
  UP,
} from "./NextBusStopDirection";
import { isUndefinedOrNull } from "../../../../../util/Utilities";

/**
 * Provide location for the next bus stop. Each bus stop can be placed to 8 different directions from the current one. 
 * We start selecting directions from Upper right and then go in clockwise direction to select the first available direction.
 */
export function provideNextLocation(
  location,
  duration,
  occupiedDirectionsForStop
) {
  return findFreeLocation(
    location,
    calculatePixelDistance(duration),
    occupiedDirectionsForStop
  );

  function findFreeLocation(location, distance, occupiedDirectionsForStop) {
    //Upper right
    if (isDirectionFree(UPPER_RIGHT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x + distance,
        location.y - distance,
        UPPER_RIGHT
      );
    }
    //Right
    else if (isDirectionFree(RIGHT, occupiedDirectionsForStop)) {
      return createResponseObject(location.x + distance, location.y, RIGHT);
    }
    //Lower right
    else if (isDirectionFree(LOWER_RIGHT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x + distance,
        location.y + distance,
        LOWER_RIGHT
      );
    }
    //Down
    else if (isDirectionFree(DOWN, occupiedDirectionsForStop)) {
      return createResponseObject(location.x, location.y + distance, DOWN);
    }
    //Lower left
    else if (isDirectionFree(LOWER_LEFT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x - distance,
        location.y - distance,
        LOWER_LEFT
      );
    }
    //Left
    else if (isDirectionFree(LEFT, occupiedDirectionsForStop)) {
      return createResponseObject(location.x - distance, location.y, LEFT);
    }
    //Upper left
    else if (isDirectionFree(UPPER_LEFT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x - distance,
        location.y + distance,
        UPPER_LEFT
      );
    }
    //UP
    else if (isDirectionFree(UP, occupiedDirectionsForStop)) {
      return createResponseObject(location.x, location.y - distance, UP);
    } else {
      console.log("Unable to find a free location!");
      return null;
    }
  }

  function createResponseObject(x, y, direction) {
    return {
      point: {
        x: x,
        y: y,
      },
      direction: direction,
    };
  }

  function isDirectionFree(direction, occupiedDirectionsForStop) {
    return (
      isUndefinedOrNull(occupiedDirectionsForStop) ||
      !occupiedDirectionsForStop.includes(direction)
    );
  }

  function calculatePixelDistance(duration) {
    return STOP_GAP * duration;
  }
}
