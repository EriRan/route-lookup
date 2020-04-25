import React from "react";
import { connect } from "react-redux";

import calculateRoute from "./routeCalculator";
import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";

class RouteResult extends React.Component {
  render() {
    if (
      this.hasUsableInput(this.props.startStop) &&
      this.hasUsableInput(this.props.destinationStop)
    ) {
      const response = calculateRoute();
      return <div>Calculator response: {response}</div>;
    }
    return <div />;
  }

  hasUsableInput(targetStop) {
    console.log(targetStop);
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
