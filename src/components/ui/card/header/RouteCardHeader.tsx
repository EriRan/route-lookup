import React from "react";

import { AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class RouteCardHeader extends React.Component<{}, {}> {
  render() {
    return (
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Reittihaku</Typography>
      </AccordionSummary>
    );
  }
}

export default RouteCardHeader;
