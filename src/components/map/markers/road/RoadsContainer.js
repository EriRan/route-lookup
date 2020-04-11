import React from "react";
import { connect } from "react-redux";

import Road from "./Road";

class RoadsContainer extends React.Component {
  render() {
    return <div>{this.renderRoutes()}</div>;
  }

  renderRoutes() {
    if (this.props.roads != null) {
      return this.props.roads.map((road) => {
        return (
          <Road
            key={`road-${road.to}-${road.from}`}
            to={road.to}
            from={road.from}
            duration={road.duration}
          />
        );
      });
    } else {
      return "Loading routes...";
    }
  }
}

const mapStateToProps = (state) => {
  return {
    roads: state.transportData.roads,
  };
};

export default connect(mapStateToProps, {})(RoadsContainer);
