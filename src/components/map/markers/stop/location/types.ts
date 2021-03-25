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

export type RoadDirection = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; //Values are from NextBusStopDirection.ts. Todo: I wonder if there is a better way of doing this
