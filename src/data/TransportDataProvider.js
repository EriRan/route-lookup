import transportData from "./reittiopas.json";
import TransportDataMapper from "./mapper/TransportDataMapper";

class TransportDataProvider {
  provide() {
    //Validate response contains: 1. Stops 2. Connections between stops 3. Public transport routes
    //If no response, use local backup
    return new TransportDataMapper().map(transportData);
  }
}

export default TransportDataProvider;