import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

class SidebarCloseButton extends React.Component {
  render() {
    return (
      <Typography align="right">
        <IconButton>
          <Close />
        </IconButton>
      </Typography>
    );
  }
}

export default SidebarCloseButton;
