import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { stopClicked } from "../../../../actions";
import { SELECTED_STOP_COLOR } from "./BusStopConstant";
import "./BusStop.css";
import { RootState } from "../../../../reducers/types";
import { StopState } from "../../../../reducers/route/types";

class BusStop extends React.Component<Props, {}> {
  public render() {
    return (
      <g onClick={this.handleClick.bind(this, this.props.name)}>
        <circle
          cx={this.props.x}
          cy={this.props.y}
          r="20"
          stroke={this.deduceStrokeColor(
            this.props.name,
            this.props.startStop,
            this.props.destinationStop
          )}
        ></circle>
        <text x={this.props.x} y={this.props.y + 5}>
          {this.props.name}
        </text>
      </g>
    );
  }

  private deduceStrokeColor(
    currentStopName: string,
    startStop: StopState | null,
    destinationStop: StopState | null
  ) {
    if (
      (startStop && currentStopName === startStop.name) ||
      (destinationStop && currentStopName === destinationStop.name)
    ) {
      return SELECTED_STOP_COLOR;
    }
    return "black";
  }

  private handleClick(stopName: string) {
    this.props.stopClicked(stopName);
  }
}

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
