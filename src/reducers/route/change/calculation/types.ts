import { Stop } from "../../../../data/mapper/types";

export type RouteNode = {
  stopData: Stop;
  nodeDuration: number;
  lineBeingUsed: string | null;
  shortestPath: Array<RouteNode>;
};

export type CalculationResponse = {
  totalDuration: number | null;
  route: Map<string, ResponseDirection> | null; //Todo: Change to the logic to use empty map instead of null instead
  errorMessages: Array<string>;
};

export type RouteKey = string; //Todo: Have this as a full object instead to make it very clear what the format is

/**
 * One stretch of the calculated journey. Points from one stop to another using one line.
 *
 * Todo: The name could be better. Give this some more thought
 */
export type ResponseDirection = {
  from: string;
  to: string;
  line: string | null;
  duration: number | null;
};
