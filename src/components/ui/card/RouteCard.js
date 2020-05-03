import React from "react";

import {
  Card,
} from "@material-ui/core";
import RouteCardContent from "./RouteCardContent";

class RouteCard extends React.Component {
  render() {
    return (
      <Card>
        <RouteCardContent transportData={this.props.transportData}/>
      </Card>
    );
  }
}

export default (RouteCard);