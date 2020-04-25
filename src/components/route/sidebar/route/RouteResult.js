import React from "react";
import { connect } from "react-redux";

import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";

class RouteResult extends React.Component {
  render() {
    if (
      !isUndefinedOrNullOrEmptyString(this.props.startStop) &&
      !isUndefinedOrNullOrEmptyString(this.props.destinationStop)
    ) {
      return <div>Can calculate the route</div>;
    }
    return <div />;
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
