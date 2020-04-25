import React from "react";
import { connect } from "react-redux";

class RouteResult extends React.Component {
  render() {
    if (this.props.calculatedRoute == null) {
      return <div />;
    }
    return (
      <div>Route has been calculated</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

export default connect(mapStateToProps, {})(RouteResult);