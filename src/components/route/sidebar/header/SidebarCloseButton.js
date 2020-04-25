import React from "react";
import { connect } from "react-redux";

import { changeSidebarOpenState } from "../../../../actions";
import { Typography, IconButton } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

class SidebarCloseButton extends React.Component {
  render() {
    return (
      <Typography align="right">
        <IconButton onClick={this.close} color="primary">
          <Close />
        </IconButton>
      </Typography>
    );
  }

  close = () => {
    this.props.changeSidebarOpenState(false);
  };
}

export default connect(null, { changeSidebarOpenState })(SidebarCloseButton);
