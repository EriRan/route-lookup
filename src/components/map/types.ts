import { Stop } from "../../data/mapper/types";

export interface MapProps {
  stopMap: Map<string, Stop>;
}

export type BusStopLocations = {
  busStopLocationMap: Map<string, BusStopLocation>;
  xMax: number;
  yMax: number;
};

export type BusStopLocation = {
  x: number;
  y: number;
};
