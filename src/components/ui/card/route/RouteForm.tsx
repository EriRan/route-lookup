import React from "react";
import { connect, ConnectedProps } from "react-redux";

import RouteInput from "./RouteInput";
import { setStartStop, setDestinationStop } from "../../../../actions";
import { Typography, Grid } from "@material-ui/core";
import { RootState } from "../../../../reducers/types";
import { Stop } from "../../../../data/mapper/types";

class RouteForm extends React.Component<Props, {}> {
  render() {
    return (
      <form>
        <Grid container alignItems="center" direction="row">
          <Typography color="primary">Mistä lähdet?</Typography>
          <RouteInput
            id="outlined-basic"
            className="center-input"
            label="Lähtöpaikka"
            autoFocus={true}
            onChangeFunction={this.props.setStartStop}
            stopMap={this.props.stopMap}
            inputStopData={this.props.startStop}
          />

          <Typography color="primary">Minne haluat mennä?</Typography>
          <RouteInput
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            onChangeFunction={this.props.setDestinationStop}
            stopMap={this.props.stopMap}
            inputStopData={this.props.destinationStop}
          />
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

const mapDispatch = {
  setStartStop,
  setDestinationStop,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PassedProps = {
  stopMap: Map<string, Stop>;
};

type Props = PropsFromRedux & PassedProps;

export default connector(RouteForm);
