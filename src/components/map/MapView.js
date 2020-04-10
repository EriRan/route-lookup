import React from "react";
import { connect } from "react-redux";
import { getPublicTransportData } from "../../actions";

class MapView extends React.Component {
  componentDidMount() {
    console.log("Component mounting");
    this.props.getPublicTransportData();
  }

  render() {
    console.log("Rendering");
    return (
      <div>
        <p>Stops: {this.props.stops.size}</p>
        <p>Roads: {this.props.roads.size}</p>
        <p>Bus lines : {this.props.busLines.size}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Mapping state");
  return {
    stops: state.stops != null ? state.stops : [],
    roads: state.roads != null ? state.roads : [],
    busLines: state.busLines != null ? state.busLines : [],
  };
};

export default connect(mapStateToProps, { getPublicTransportData })(MapView);
