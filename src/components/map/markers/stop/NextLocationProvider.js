import { RIGHT, DOWN, LEFT, UP } from "./NextBusStopDirection";
import { STOP_GAP } from "./BusStopConstant";

export function provideNextLocation(location, index) {
  switch (index) {
    case RIGHT:
      return {
        x: location.x + STOP_GAP,
        y: location.y,
      };
    case DOWN:
      return {
        x: location.x,
        y: location.y + STOP_GAP,
      };
    case LEFT:
      return {
        x: location.x - STOP_GAP,
        y: location.y,
      };
    case UP:
      return {
        x: location.x,
        y: location.y - STOP_GAP,
      };
    default:
      console.log("Ran out of possible next directions. Returning a weird location so that this is noticed");
      return {
        x: 0,
        y: 0,
      };
  }
}
