import React from "react";

import { Divider, Accordion, Grid, AccordionDetails } from "@material-ui/core";

import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader";
import { UiContainerProps } from "../types";

class RouteCardContent extends React.Component<UiContainerProps, {}> {
  render() {
    return (
      <Accordion>
        <RouteCardHeader />
        <Divider />
        <AccordionDetails>
          <Grid container direction="column">
            <RouteForm stopMap={this.props.transportData.stopMap} />
            <Divider />
            <RouteResult />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default RouteCardContent;
