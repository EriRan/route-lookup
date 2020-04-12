import { RIGHT, DOWN, LEFT, UP } from "./RoadDirection";

export function provideDirection(index) {
  switch (index) {
    case 0:
      return RIGHT;
    case 1:
      return DOWN;
    case 2:
      return LEFT;
    case 3:
      return UP;
    default:
      return null;
  }
}
