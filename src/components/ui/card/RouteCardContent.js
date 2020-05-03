import React from "react";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
} from "@material-ui/core";

import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader";

class RouteCardContent extends React.Component {
  render() {
    return (
      <ExpansionPanel>
        <RouteCardHeader />
        <ExpansionPanelDetails>
          <RouteForm possibleStops={this.props.transportData.stops} />
          <RouteResult transportData={this.props.transportData} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RouteCardContent;
