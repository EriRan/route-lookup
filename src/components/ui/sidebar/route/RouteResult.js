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

  renderRoute(optimalRoute) {
    if (optimalRoute.totalDuration === 0) {
      return (
        <Typography key={`result-stop-no-route`}>
          Olet jo määränpäässäsi
        </Typography>
      );
    } else if (!isUndefinedOrNullOrEmptyString(optimalRoute.message)) {
      return (
        <Typography key={`result-stop-no-route`}>
          {optimalRoute.message}
        </Typography>
      );
    } else {
      const routeData = Array.from(optimalRoute.route).map((entry) => {
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
          <Typography>Kesto yhteensä: {optimalRoute.totalDuration}</Typography>
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
