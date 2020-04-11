import React from "react";
import { connect } from "react-redux";

import { getPublicTransportData } from "../../actions";
import BusStopContainer from "./markers/BusStopContainer";

class MapView extends React.Component {
  componentDidMount() {
    this.props.getPublicTransportData();
  }

  render() {
    return (
      <div>
        <BusStopContainer/>
        <p>Roads: {this.props.roads.length}</p>
        <p>Bus lines : {this.props.busLines.length}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stops: state.transportData.stops != null ? state.transportData.stops : [],
    roads: state.transportData.roads != null ? state.transportData.roads : [],
    busLines: state.transportData.busLines != null ? state.transportData.busLines : [],
  };
};

export default connect(mapStateToProps, { getPublicTransportData })(MapView);
