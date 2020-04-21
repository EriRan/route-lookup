import React from "react";
import { Divider, Typography } from "@material-ui/core";
import SidebarCloseButton from "./SidebarCloseButton";

class SidebarHeader extends React.Component {
  render() {
    return (
      <div>
        <SidebarCloseButton />
        <Divider />
        <Typography variant="h4" align="center" color="primary">
          Kuutiola
          <br />
          reittiopas
        </Typography>
      </div>
    );
  }
}

export default SidebarHeader;
