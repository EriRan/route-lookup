import React from "react";
import {connect} from "react-redux";

import {
  CardContent,
  Divider,
} from "@material-ui/core";
import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader"

class RouteCardContent extends React.Component {
  render() {
    return (
      <CardContent>
        <RouteCardHeader />
        <Divider />
        <RouteForm possibleStops={this.props.transportData.stops} />
        <RouteResult transportData={this.props.transportData} />
      </CardContent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.sidebar.isOpen,
  };
};

export default connect(mapStateToProps, {})(RouteCardContent);
