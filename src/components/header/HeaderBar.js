import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SidebarOpenButton from "./SidebarOpenButton";

class HeaderBar extends React.Component {
  render() {
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <SidebarOpenButton/>
          <Typography variant="h5" align="right">
            Kuutiola reittiopas
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderBar;