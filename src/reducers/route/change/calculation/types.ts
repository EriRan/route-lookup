import { Stop } from "../../../../data/mapper/types";

export type RouteNode = {
  stopData: Stop;
  nodeDuration: number;
  lineBeingUsed: String | null;
  shortestPath: Array<RouteNode>;
};

export type CalculationResponse = {
  totalDuration: number | null;
  route: Map<String, ResponseDirection> | null; //Todo: Change to the logic to use empty map instead of null instead
  errorMessage: String | null;
};

export type RouteKey = String; //Todo: Have this as a full object instead to make it very clear what the format is

/**
 * One stretch of the calculated journey. Points from one stop to another using one line.
 *
 * Todo: The name could be better. Give this some more thought
 */
export type ResponseDirection = {
  from: String;
  to: String;
  line: String | null;
  duration: number | null;
};
