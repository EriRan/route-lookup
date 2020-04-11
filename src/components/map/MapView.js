import React from "react";

import BusTrafficContainer from "./markers/BusTrafficContainer";
import TransportDataProvider from "../../data/TransportDataProvider";

class MapView extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    return (
      <div>
        <BusTrafficContainer
          stops={transportData.stops}
          roads={transportData.roads}
        />
        <p>Stops : {transportData.stops.length}</p>
        <p>Roads : {transportData.roads.length}</p>
        <p>Bus lines : {transportData.busLines.length}</p>
      </div>
    );
  }
}

export default MapView;
