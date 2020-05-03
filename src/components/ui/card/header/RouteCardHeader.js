import React from "react";

import { CardHeader } from "@material-ui/core";
import RouteCardCloseButton from "./RouteCardCloseButton";

class RouteCardHeader extends React.Component {
  render() {
    return <CardHeader action={<RouteCardCloseButton />} />;
  }
}

export default RouteCardHeader;
