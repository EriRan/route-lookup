import React from "react";
import { connect } from "react-redux";

import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";
import RouteCalculator from "./RouteCalculator";

class RouteResult extends React.Component {
  componentDidMount() {
    this.routeCalculator = new RouteCalculator(this.props.transportData);
  }

  render() {
    if (
      this.hasUsableInput(this.props.startStop) &&
      this.hasUsableInput(this.props.destinationStop)
    ) {
      return (
        <div>
          Calculator response:
          {this.routeCalculator.calculate(
            this.props.startStop.name,
            this.props.destinationStop.name
          )}
        </div>
      );
    }
    return <div />;
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
