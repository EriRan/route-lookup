import { BusStopLocation, MapProps } from "../types";

export interface TrafficMapProps extends MapProps {
  busStopLocationMap: Map<string, BusStopLocation>;
}
