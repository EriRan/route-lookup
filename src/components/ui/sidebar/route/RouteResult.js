import React from "react";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";
import RouteCalculator from "../../../../reducers/route/calculation/RouteCalculator";

import {
  isUndefinedOrNull,
  isUndefinedOrNullOrEmptyString,
} from "../../../../util/Utilities";

class RouteResult extends React.Component {
  componentDidMount() {
    this.routeCalculator = new RouteCalculator(this.props.transportData);
  }

  render() {
    if (!isUndefinedOrNull(this.props.calculatedRoute)) {
      return this.renderRoute(this.props.calculatedRoute);
    }
    return <div />;
  }

  renderRoute(calculatedRoute) {
    console.log(calculatedRoute);
    if (!isUndefinedOrNullOrEmptyString(calculatedRoute.errorMessage)) {
      return (
        <Typography key={`result-stop-no-route`}>
          {calculatedRoute.errorMessage}
        </Typography>
      );
    } else {
      const routeData = Array.from(calculatedRoute.route).map((entry) => {
        const stopRoute = entry[1];
        return (
          <Typography key={`result-stop-${stopRoute.from}-${stopRoute.to}`}>
            Pysäkkiltä: {stopRoute.from} pysäkkiin {stopRoute.to} linjalla:{" "}
            {stopRoute.line}
          </Typography>
        );
      });
      return (
        <div>
          {routeData}
          <Typography>Kesto yhteensä: {calculatedRoute.totalDuration}</Typography>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

export default connect(mapStateToProps, {})(RouteResult);