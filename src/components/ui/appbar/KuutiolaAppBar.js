import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const KuutiolaAppBar = ({ classes }) => (
  <AppBar position="fixed" color="primary">
    <Toolbar>
      <Typography variant="h5" align="right" className={classes.centeredTitle}>
        Kuutiola reittiopas
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(KuutiolaAppBar);
