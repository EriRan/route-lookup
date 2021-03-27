import React, { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { stopClicked } from "../../../../actions";
import {
  BUS_STOP_CIRCLE_RADIUS,
  SELECTED_STOP_COLOR,
  UNSELECTED_STOP_COLOR,
} from "./BusStopConstant";
import "./BusStop.css";
import { RootState } from "../../../../reducers/types";
import { StopState } from "../../../../reducers/route/types";

//Todo: Okay now this is a functional component. Next try to apply the typography theme to the bus stop character
const BusStop: FunctionComponent<Props> = (props) => {
  return (
    <g onClick={() => handleClick(props.name, props.stopClicked)}>
      <circle
        cx={props.x}
        cy={props.y}
        r={BUS_STOP_CIRCLE_RADIUS.toString()}
        stroke={deduceStrokeColor(
          props.name,
          props.startStop,
          props.destinationStop
        )}
      ></circle>
      <text x={props.x} y={props.y + 5}>
        {props.name}
      </text>
    </g>
  );
};

const deduceStrokeColor = (
  currentStopName: string,
  startStop: StopState | null,
  destinationStop: StopState | null
) => {
  if (
    (startStop && currentStopName === startStop.name) ||
    (destinationStop && currentStopName === destinationStop.name)
  ) {
    return SELECTED_STOP_COLOR;
  }
  return UNSELECTED_STOP_COLOR;
};

const handleClick = (name: string, stopClicked: Function) => {
  stopClicked(name);
};

//Let's create a Typescript type from redux props and the props that are provided to this bus stop
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  name: string;
  x: number;
  y: number;
};

const mapStateToProps = (state: RootState) => {
  return {
    startStop: state.route.startStop, //Reminder: get startStop variable from Route reducer
    destinationStop: state.route.destinationStop,
  };
};

const connector = connect(mapStateToProps, { stopClicked });

export default connector(BusStop);
