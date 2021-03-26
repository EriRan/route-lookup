import { Stop } from "../../../../../data/mapper/types";
import { BusStopLocation } from "../../../types";

/**
 * Types in this file are only used for building the bus stop location map. Not a good idea to use these anywhere else.
 */

export type AlreadyIncludedRoad = {
  fromName: string;
  toName: string;
};

export type NextLocation = {
  point: BusStopLocation;
  direction: RoadDirection;
};

export type NeighbourStop = {
  stop: Stop;
  location: BusStopLocation;
};

export enum RoadDirection {
  UPPER_RIGHT,
  RIGHT,
  LOWER_RIGHT,
  DOWN,
  LOWER_LEFT,
  LEFT,
  UPPER_LEFT,
  UP,
}
