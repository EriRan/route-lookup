import React from "react";

import { TextField, Typography } from "@material-ui/core";

class RouteInput extends React.Component {
  render() {
    return (
      <form>
        <Typography align="center">Mistä lähdet?</Typography>
        <TextField id="outlined-basic" label="Lähtöpaikka" variant="outlined" />
        
        <Typography align="center">Minne haluat mennä?</Typography>
        <TextField id="outlined-basic" label="Määränpää" variant="outlined" />
      </form>
    );
  }
}

export default RouteInput;
