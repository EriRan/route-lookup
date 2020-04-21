import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SidebarOpenButton from "./SidebarOpenButton";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const HeaderBar = ({ classes }) => (
  <AppBar position="fixed" color="primary">
    <Toolbar>
      <SidebarOpenButton />
      <Typography variant="h5" align="right" className={classes.centeredTitle}>
        Kuutiola reittiopas
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(HeaderBar);
