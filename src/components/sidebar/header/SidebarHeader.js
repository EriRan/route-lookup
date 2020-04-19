import React from "react";
import { Divider, Typography, IconButton } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

class SidebarHeader extends React.Component {
  render() {
    return (
      <div>
        <Typography align="right">
          <IconButton>
            <Close />
          </IconButton>
        </Typography>
        <Divider />
        <Typography variant="h4" align="center">
          Kuutiola
          <br />
          reittiopas
        </Typography>
      </div>
    );
  }
}

export default SidebarHeader;
