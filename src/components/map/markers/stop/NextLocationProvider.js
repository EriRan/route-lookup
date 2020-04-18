import { STOP_GAP } from "./BusStopConstant";
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
import { isUndefinedOrNull } from "../../../../util/Utilities";

/**
 * Search for first available direction. We try 9 directions,
 * starting from upper right and then try every direction in a clockwise order
 */
export function provideNextLocation(
  location,
  duration,
  occupiedDirectionsForStop
) {
  console.log(occupiedDirectionsForStop);
  const distance = calculateDistance(duration);
  return findFreeLocation(location, distance, occupiedDirectionsForStop);

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
      console.log("Unable to find free location!");
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

  function calculateDistance(duration) {
    return STOP_GAP * duration;
  }
}
