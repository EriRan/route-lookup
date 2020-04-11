import React from "react";

import BusStopContainer from "./markers/stop/BusStopContainer";
import RoutesContainer from "./markers/road/RoadsContainer";
import TransportDataProvider from "../../data/TransportDataProvider";

class MapView extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    return (
      <div>
        <BusStopContainer
          stops={transportData.stops}
          routes={transportData.routes}
        />
        <RoutesContainer />
        <p>Bus lines : {transportData.busLines.length}</p>
      </div>
    );
  }
}

export default MapView;
