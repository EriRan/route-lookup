import React from "react";
import { connect } from "react-redux";
import { getPublicTransportData } from "../../actions";

class MapView extends React.Component {
  componentDidMount() {
    this.props.getPublicTransportData();
  }

  render() {
    return <div>MapView</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    publicTransportData: state.publicTransportData,
  };
};

export default connect(mapStateToProps, { getPublicTransportData })(MapView);
