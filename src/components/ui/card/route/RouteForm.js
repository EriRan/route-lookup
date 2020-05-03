import React from "react";
import { connect } from "react-redux";

import RouteInput from "./RouteInput";
import { setStartStop, setDestinationStop } from "../../../../actions";
import { Typography, Grid } from "@material-ui/core";

class RouteForm extends React.Component {
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
            onChangeFunction = {this.props.setStartStop}
            possibleStops={this.props.possibleStops}
            inputStopData={this.props.startStop}
          />

          <Typography color="primary">Minne haluat mennä?</Typography>
          <RouteInput
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            onChangeFunction = {this.props.setDestinationStop}
            possibleStops={this.props.possibleStops}
            inputStopData={this.props.destinationStop}
          />
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

export default connect(mapStateToProps, { setStartStop, setDestinationStop })(
  RouteForm
);
