import React from "react";
import { Divider, Typography } from "@material-ui/core";
import SidebarCloseButton from "./SidebarCloseButton";

class SidebarHeader extends React.Component {
  render() {
    return (
      <div>
        <SidebarCloseButton />
      </div>
    );
  }
}

export default SidebarHeader;
