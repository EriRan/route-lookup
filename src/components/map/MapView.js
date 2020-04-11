import React from "react";
import { connect } from "react-redux";

import { getPublicTransportData } from "../../actions";
import BusStopContainer from "./markers/stop/BusStopContainer";
import RoutesContainer from "./markers/road/RoadsContainer";

class MapView extends React.Component {
  componentDidMount() {
    this.props.getPublicTransportData();
  }

  render() {
    return (
      <div>
        <BusStopContainer/>
        <RoutesContainer/>
        <p>Bus lines : {this.props.busLines.length}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    busLines: state.transportData.busLines != null ? state.transportData.busLines : []
  };
};

export default connect(mapStateToProps, { getPublicTransportData })(MapView);
