import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { setStartStop, setDestinationStop } from "../../../../actions/route";
import { TextField, Typography, Grid } from "@material-ui/core";

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
            onChange={event => this.startStopChanged(event)}
          />

          <Typography color="primary">Minne haluat mennä?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            variant="outlined"
            margin="dense"
            color="primary"
            onChange={event => this.destinationStopChanged(event)}
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
}

export default connect(null, { setStartStop, setDestinationStop })(RouteInput);
