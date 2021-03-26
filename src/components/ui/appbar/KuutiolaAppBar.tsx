import React, { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = ({
  classes,
}) => (
  <AppBar color="primary">
    <Toolbar>
      <Typography variant="h5" align="right" className={classes.centeredTitle}>
        Kuutiola reittiopas
      </Typography>
      <KuutiolaAppBarSubtitle />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(KuutiolaAppBar);
