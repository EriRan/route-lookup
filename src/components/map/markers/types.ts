import { BusStopLocation, MapProps } from "../types";

export interface TrafficMapProps extends MapProps {
  busStopLocationsMap: Map<String, BusStopLocation>;
}
