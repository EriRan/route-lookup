import transportData from "./json/reittiopas.json";
import TransportDataMapper from "./mapper/TransportDataMapper";
import { TransportData } from "./mapper/types";

export default (function () {
  var instance: TransportData;

  function createInstance() {
    //Validate response contains: 1. Stops 2. Connections between stops 3. Public transport routes
    //If no response, use local backup
    return new TransportDataMapper().map(transportData);
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
