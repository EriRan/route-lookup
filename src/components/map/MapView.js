import React from "react";

import BusTrafficContainer from "./markers/BusTrafficContainer";
import TransportDataProvider from "../../data/TransportDataProvider";

class MapView extends React.Component {
  render() {
    var transportData = new TransportDataProvider().provide();
    console.log(transportData);
    return (
      <div>
        <BusTrafficContainer
          stops={transportData.stops}
        />
        <p>Stops : {transportData.stops.length}</p>
        <p>Bus lines : {transportData.lines.length}</p>
      </div>
    );
  }
}

export default MapView;
