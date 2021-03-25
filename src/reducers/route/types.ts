import { CalculationResponse } from "./change/calculation/types";

export type Action = {
  type: string; // I would like this to have only values from actions.ts but I don't know how to do that.
  payload: Payload;
};

export type RouteStore = {
  startStop: StopState | null;
  destinationStop: StopState | null;
  calculatedRoute: CalculationResponse | null;
};

export type Payload = StopState;

export type StopState = {
  name: string | null;
  hasErrors?: boolean;
};
