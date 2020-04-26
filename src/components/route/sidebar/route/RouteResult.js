import React from "react";
import { connect } from "react-redux";

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
      return <div>Calculator response:{this.renderRoute(optimalRoute)}</div>;
    }
    return <div />;
  }

  renderRoute(optimalRoute) {
    const routeData = optimalRoute.route.map((stopRoute) => {
      return (
        <div key={`result-stop-${stopRoute.name}`}>
          Pysäkki: {stopRoute.name}, Linja: {stopRoute.line}
        </div>
      );
    });
    return (
      <div>
        {routeData}
        <div>Kestää yhteensä: {optimalRoute.totalDuration}</div>
      </div>
    );
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
