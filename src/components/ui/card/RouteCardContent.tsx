import React from "react";

import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  Grid,
} from "@material-ui/core";

import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader";
import { UiContainerProps } from "../types";

class RouteCardContent extends React.Component<UiContainerProps, {}> {
  render() {
    return (
      <ExpansionPanel>
        <RouteCardHeader />
        <Divider />
        <ExpansionPanelDetails>
          <Grid direction="column">
            <RouteForm possibleStops={this.props.transportData.stopMap} />
            <Divider />
            <RouteResult />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RouteCardContent;
