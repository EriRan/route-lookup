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
        <p>Stops: {this.props.stops.length}</p>
        <p>Roads: {this.props.roads.length}</p>
        <p>Bus lines : this is an object</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Mapping state");
  console.log(state);
  console.log(state.transportData.stops);
  return {
    stops: state.transportData.stops != null ? state.transportData.stops : [],
    roads: state.transportData.roads != null ? state.transportData.roads : [],
    busLines: state.transportData.busLines != null ? state.transportData.busLines : [],
  };
};

export default connect(mapStateToProps, { getPublicTransportData })(MapView);
