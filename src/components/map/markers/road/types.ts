import { Road } from "../../../../data/mapper/types";
import { ResponseDirection } from "../../../../reducers/route/change/calculation/types";
import { BusStopLocation } from "../../types";

export type RoadLineProps = {
  roadData: Road;
  calculationDone: boolean;
  calculatedRouteNode?: ResponseDirection;
  startPointLocation?: BusStopLocation;
  endPointLocation?: BusStopLocation;
  includesLines?: Array<String>;
};

export type RoadDurationProps = {
  startPointLocation?: BusStopLocation;
  endPointLocation?: BusStopLocation;
  duration: number;
};

export type RoadStyle = {
  color: string;
  opacity: number;
};
