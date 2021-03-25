import { Road } from "../../../../data/mapper/types";
import { ResponseDirection } from "../../../../reducers/route/change/calculation/types";
import { BusStopLocation } from "../../types";

export type RoadLineProps = {
  roadData: Road;
  startPointLocation?: BusStopLocation;
  endPointLocation?: BusStopLocation;
  includesLines?: Array<String>;
  calculatedRouteNode?: ResponseDirection;
  isRouteCalculated: boolean;
};

export type RoadStyle = {
  color: string;
  opacity: number;
};
