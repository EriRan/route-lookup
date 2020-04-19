import React from "react";

import { TextField, Typography, Grid } from "@material-ui/core";

class RouteInput extends React.Component {
  render() {
    return (
      <form>
        <Grid container alignItems="center" direction="column">
          <Typography>Mistä lähdet?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Lähtöpaikka"
            variant="outlined"
            margin="dense"
          />

          <Typography>Minne haluat mennä?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            variant="outlined"
            margin="dense"
          />
        </Grid>
      </form>
    );
  }
}

export default RouteInput;
