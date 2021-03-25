import { Stop } from "../../../../data/mapper/types";
import { StopState } from "../../../../reducers/route/types";

export type RouteInputProps = {
  label: string;
  onChangeFunction: any;
  stopMap: Map<string, Stop>;
  inputStopData: StopState | null;
  autoFocus?: boolean;
};

export type RouteInputEvent = {
  target: {
    value: unknown;
  };
};

export type CompressedRoute = {
  from: string;
  to: string;
  line: string;
};
