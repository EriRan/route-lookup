import React from "react";

import { ExpansionPanelSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class RouteCardHeader extends React.Component {
  render() {
    return (
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Reittihaku</Typography>
      </ExpansionPanelSummary>
    );
  }
}

export default RouteCardHeader;
