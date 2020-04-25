import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { setStartStop, setDestinationStop } from "../../../../actions/route";
import { TextField, Typography, Grid } from "@material-ui/core";
import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";

class RouteInput extends React.Component {
  render() {
    return (
      <form>
        <Grid container alignItems="center" direction="column">
          <Typography color="primary">Mistä lähdet?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Lähtöpaikka"
            autoFocus={true}
            variant="outlined"
            margin="dense"
            color="primary"
            onChange={(event) => this.startStopChanged(event)}
            error={this.isInputInvalid(
              this.props.startStop,
              this.props.possibleStops
            )}
          />

          <Typography color="primary">Minne haluat mennä?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            variant="outlined"
            margin="dense"
            color="primary"
            onChange={(event) => this.destinationStopChanged(event)}
            error={this.isInputInvalid(
              this.props.destinationStop,
              this.props.possibleStops
            )}
          />
        </Grid>
      </form>
    );
  }

  startStopChanged(event) {
    this.props.setStartStop(_.upperCase(event.target.value));
  }

  destinationStopChanged(event) {
    this.props.setDestinationStop(_.upperCase(event.target.value));
  }

  isInputInvalid(input, possibleStops) {
    return (
      !isUndefinedOrNullOrEmptyString(input)
      && !possibleStops.some((stop) => stop.name === input)
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
  RouteInput
);
