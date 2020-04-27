import React from "react";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";
import RouteCalculator from "./calculation/RouteCalculator";

class RouteResult extends React.Component {
  componentDidMount() {
    this.routeCalculator = new RouteCalculator(this.props.transportData);
  }

  render() {
    if (
      this.hasUsableInput(this.props.startStop) &&
      this.hasUsableInput(this.props.destinationStop)
    ) {
      const optimalRoute = this.routeCalculator.calculate(
        this.props.startStop.name,
        this.props.destinationStop.name
      );
      return this.renderRoute(optimalRoute);
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
      const routeData = optimalRoute.route.map((stopRoute) => {
        return (
          <Typography key={`result-stop-${stopRoute.name}`}>
            Pysäkki: {stopRoute.name}, Linja: {stopRoute.line}
          </Typography>
        );
      });
      return (
        <div>
          {routeData}
          <Typography>Kestää yhteensä: {optimalRoute.totalDuration}</Typography>
        </div>
      );
    }
  }

  hasUsableInput(targetStop) {
    return (
      !isUndefinedOrNullOrEmptyString(targetStop.name) && !targetStop.hasError
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

export default connect(mapStateToProps, {})(RouteResult);
