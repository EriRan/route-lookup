import { Stop } from "../../data/mapper/types";

export interface MapProps {
  stopMap: Map<String, Stop>;
}

export type BusStopLocations = {
  busStopLocationMap: Map<String, BusStopLocation>;
  xMax: number;
  yMax: number;
};

export type BusStopLocation = {
  x: number;
  y: number;
};
