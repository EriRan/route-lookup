import React from "react";
import { connect } from "react-redux";

import Road from "./Road";

class RoadsContainer extends React.Component {
  render() {
    return <div>{this.renderRoutes()}</div>;
  }

  renderRoutes() {
    return this.props.roads.map((road) => {
      return <Road to={road.to} from={road.from} duration={road.duration} />;
    });
  }
}

const mapStateToProps = (state) => {
  return {
    roads: state.transportData.roads != null ? state.transportData.roads : [],
  };
};

export default connect(mapStateToProps, {})(RoadsContainer);
