import unmappedTransportData from "./json/reittiopas.json";
import TransportDataMapper from "./mapper/TransportDataMapper";
import { TransportData } from "./mapper/types";

import _ from "lodash";

export default (function () {
  let instance: TransportData;

  function createInstance() {
    const transportData = new TransportDataMapper().map(unmappedTransportData);
    //Quick validations to create warnings to console if something seems to be wrong with the data
    if (_.isEmpty(transportData.lines)) {
      console.error("No lines were included in the transport data!");
    }
    if (_.isEmpty(transportData.stopMap)) {
      console.error("No stops were included in the transport data!");
    }
    return transportData;
  }

  return {
    getInstance: function (): TransportData {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
