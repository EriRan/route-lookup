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

class RouteCardContent extends React.Component {
  render() {
    return (
      <ExpansionPanel>
        <RouteCardHeader />
        <Divider />
        <ExpansionPanelDetails>
          <Grid direction="column">
            <RouteForm possibleStops={this.props.transportData.stops} />
            <Divider />
            <RouteResult transportData={this.props.transportData} />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RouteCardContent;
