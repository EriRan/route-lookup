import React, { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { KuutiolaAppBarProps } from "./types";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

//Todo: Would be really cool to have a subtitle that displayed a text if the build is a dev build!!!
const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = ({
  classes,
}) => (
  <AppBar color="primary">
    <Toolbar>
      <Typography variant="h5" align="right" className={classes.centeredTitle}>
        Kuutiola reittiopas
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(KuutiolaAppBar);
