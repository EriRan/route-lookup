import React from "react";

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
          />

          <Typography color="primary">Minne haluat mennä?</Typography>
          <TextField
            id="outlined-basic"
            className="center-input"
            label="Määränpää"
            variant="outlined"
            margin="dense"
            color="primary"
          />
        </Grid>
      </form>
    );
  }
}

export default RouteInput;
